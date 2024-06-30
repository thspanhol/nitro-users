import { useRef, useEffect } from "react";

const DeleteUser = ({ dataBase, getData }) => {
  useEffect(() => {
    getData();
  }, []);

  const email = useRef();
  const senha = useRef();

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

  return (
    <div>
      <h1>Excluir Usuário</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">E-mail:</label>
        <input ref={email} id="email" type="text" />

        <label htmlFor="senha">Senha:</label>
        <input ref={senha} id="senha" type="password" />

        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            const usuario = dataBase.find(
              (user) => user.email === email.current.value
            );

            if (!usuario) {
              alert("Nenhum usuário cadastrado nesse e-mail.");
              return;
            }

            if (usuario.senha !== senha.current.value) {
              alert("Senha incorreta.");
              return;
            }

            email.current.value = "";
            senha.current.value = "";
            deletarUsuario(usuario.id);
            alert("Usuário excluído.");
          }}
        >
          Excluir Usuário
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
