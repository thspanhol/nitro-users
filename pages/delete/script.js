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

  const deletarUsuario = async (id) => {
    const url = `https://crud-node-a7h4.onrender.com/usuarios/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      console.log("Usuário deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  document.getElementById("DELETE").addEventListener("click", async () => {
    const data = await getUsers();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = data.find((user) => user.email === email);

    if (!usuario) {
      alert("Nenhum usuário cadastrado nesse e-mail.");
      return;
    }

    if (usuario.senha !== senha) {
      alert("Senha incorreta.");
      return;
    }

    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    deletarUsuario(usuario.id);
    alert("Usuário excluído.");
  });
});
