document.addEventListener("DOMContentLoaded", () => {
  const getUsers = async () => {
    let dataBase = [];

    try {
      const response = await fetch(
        "https://crud-node-a7h4.onrender.com/usuarios"
      );
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      dataBase = data;
    } catch (error) {
      console.error("Error:", error);
    }

    return dataBase;
  };

  getUsers();

  const validaSenha = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const validaEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function criarUsuario(nome, email, senha) {
    const url = "https://crud-node-a7h4.onrender.com/usuarios";
    const data = {
      nome,
      email,
      senha,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      console.log("Usuário criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  document.getElementById("POST").addEventListener("click", async () => {
    const data = await getUsers();

    const todosEmails = data.map((user) => user.email);

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirm = document.getElementById("confirm").value;

    if (!validaEmail(email)) {
      alert("Por favor, informe um e-mail válido.");
      return;
    }

    if (todosEmails.includes(email)) {
      alert("Este e-mail já está cadastrado em outro usuário.");
      return;
    }

    if (!validaSenha(senha)) {
      alert(
        "Sua senha deve conter pelo menos 8 caracteres, no mínimo 1 deles deve ser maiúsculo, 1 minúsculo e 1 numeral."
      );
      return;
    }

    const confirmaSenha = senha === confirm;

    if (!confirmaSenha) {
      alert("Sua senha não foi confirmada corretamente.");
      return;
    }

    criarUsuario(nome, email, senha);

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirm").value = "";

    alert("Usuário Criado.");
  });
});
