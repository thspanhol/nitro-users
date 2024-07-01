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

  document.getElementById("PUT").addEventListener("click", async () => {
    const data = await getUsers();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirm = document.getElementById("confirm").value;

    const usuario = await data.find((user) => user.email === email);

    if (!usuario) {
      alert("Nenhum usuário cadastrado nesse e-mail.");
      return;
    }

    if (usuario.nome !== nome) {
      alert("Este não é o nome correto desse usuário.");
      return;
    }

    if (usuario.senha !== senha) {
      alert("Senha incorreta.");
      return;
    }

    if (senha !== confirm) {
      alert("Confirmação de senha incorreta.");
      return;
    }

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirm").value = "";

    console.log(usuario);

    document.getElementById("TEXT").textContent =
      "Agora informe os dados atualizados.";
    document.getElementById("PUT").style.display = "none";
    document.getElementById("ATT").style.display = "block";
    document.getElementById("ATT").name = usuario.email;

    console.log(document.getElementById("ATT").name);
  });

  document.getElementById("ATT").addEventListener("click", async () => {
    const data = await getUsers();
    const usuario = await data.find(
      (user) => user.email === document.getElementById("ATT").name
    );
    const todosEmails = data.map((user) => user.email);
    const id = usuario.id;

    const url = `https://crud-node-a7h4.onrender.com/usuarios/${id}`;

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirm = document.getElementById("confirm").value;

    if (todosEmails.includes(email) && email !== usuario.email) {
      alert("Esse e-mail está cadastrado em outro usuário.");
      return;
    }

    if (senha !== confirm) {
      alert("Confirmação de senha incorreta.");
      return;
    }

    const newData = {
      nome,
      email,
      senha,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      console.log("Usuário atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }

    alert("Usuário Atualizado.");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirm").value = "";
  });
});
