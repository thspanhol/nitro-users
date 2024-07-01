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

  const displayUsers = async () => {
    const users = await getUsers();
    const usersDiv = document.getElementById("users");

    if (users.length > 0) {
      users.forEach((user) => {
        const userElement = document.createElement("p");
        userElement.textContent = `Nome: ${user.nome} || Email: ${user.email}`;
        usersDiv.appendChild(userElement);
      });
    } else {
      usersDiv.textContent = "Nenhum usuário encontrado.";
    }
  };

  displayUsers();
});
