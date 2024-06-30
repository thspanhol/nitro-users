import { useRef, useEffect } from "react";

const CreateUser = ({ dataBase, getData, validaEmail, validaSenha }) => {
  useEffect(() => {
    getData();
  }, []);

  const nome = useRef();
  const email = useRef();
  const senha = useRef();
  const confirm = useRef();

  const todosEmails = dataBase.map((user) => user.email);

  const criarUsuario = async (nome, email, senha) => {
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
  };

  return (
    <div>
      <h1>Criar Usuário</h1>
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

            if (todosEmails.includes(email.current.value)) {
              alert("Este e-mail já está cadastrado em outro usuário.");
              return;
            }

            if (!validaSenha(senha.current.value)) {
              alert(
                "Sua senha deve conter pelo menos 8 caracteres, no mínimo 1 deles deve ser maiúsculo, 1 minúsculo e 1 numeral."
              );
              return;
            }

            const confirmaSenha = senha.current.value === confirm.current.value;

            if (!confirmaSenha) {
              alert("Sua senha não foi confirmada corretamente.");
              return;
            }

            criarUsuario(
              nome.current.value,
              email.current.value,
              senha.current.value
            );

            nome.current.value = "";
            email.current.value = "";
            senha.current.value = "";
            confirm.current.value = "";
            alert("Usuário Criado.");
          }}
        >
          Criar Usuário
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
