import { useRef, useState, useEffect } from "react";

const EditUser = ({ dataBase, getData, validaEmail, validaSenha }) => {
  useEffect(() => {
    getData();
  }, []);

  const [edit, setEdit] = useState(false);
  const [selectUser, setselectUser] = useState("");

  const nome = useRef();
  const email = useRef();
  const senha = useRef();
  const confirm = useRef();

  const todosEmails = dataBase.map((user) => user.email);

  const atualizarUsuario = async (id, nome, email, senha) => {
    const url = `https://crud-node-a7h4.onrender.com/usuarios/${id}`;
    const data = {
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
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      console.log("Usuário atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Alterar Usuário</h1>

      {edit ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="nome">Nome:</label>
          <input ref={nome} id="nome" type="text" />

          <label htmlFor="email">E-mail:</label>
          <input ref={email} id="email" type="text" />

          <label htmlFor="senha">Senha:</label>
          <input ref={senha} id="senha" type="password" />

          <label htmlFor="confirm">Confirmação de Senha:</label>
          <input ref={confirm} id="confirm" type="password" />

          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              if (!validaEmail(email.current.value)) {
                alert("Por favor, informe um e-mail válido.");
                return;
              }

              if (
                todosEmails.includes(email.current.value) &&
                selectUser.email !== email.current.value
              ) {
                alert("Este e-mail já está cadastrado em outro usuário.");
                return;
              }

              if (!validaSenha(senha.current.value)) {
                alert(
                  "Sua senha deve conter pelo menos 8 caracteres, no mínimo 1 deles deve ser maiúsculo, 1 minúsculo e 1 numeral."
                );
                return;
              }

              const confirmaSenha =
                senha.current.value === confirm.current.value;

              if (!confirmaSenha) {
                alert("Sua senha não foi confirmada corretamente.");
                return;
              }

              atualizarUsuario(
                selectUser.id,
                nome.current.value,
                email.current.value,
                senha.current.value
              );

              nome.current.value = "";
              email.current.value = "";
              senha.current.value = "";
              confirm.current.value = "";
              setEdit(false);
              alert("Usuário Alterado.");
            }}
          >
            Confirmar Alteração
          </button>
        </div>
      ) : (
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

              setselectUser(usuario);
              email.current.value = "";
              senha.current.value = "";
              setEdit(true);
            }}
          >
            Alterar Usuário
          </button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
