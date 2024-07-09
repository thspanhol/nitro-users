const Header = ({ setMain, dataBase }) => {
  return (
    <div>
      <img
        src="https://seeklogo.com/images/N/nitronews-email-marketing-logo-8BE182F769-seeklogo.com.png"
        className="logo nitro"
        alt="Nitro logo"
        onClick={() => setMain("Welcome")}
      />
      <div>
        <button
          style={{ margin: "2px" }}
          onClick={() => setMain("CreateUser")}
          disabled={dataBase === "Carregando"}
        >
          Criar Usuário
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setMain("EditUser")}
          disabled={dataBase === "Carregando"}
        >
          Alterar Usuário
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setMain("ShowUsers")}
          disabled={dataBase === "Carregando"}
        >
          Mostrar Usuários
        </button>
        <button
          style={{ margin: "2px" }}
          onClick={() => setMain("DeleteUser")}
          disabled={dataBase === "Carregando"}
        >
          Excluir Usuário
        </button>
      </div>
    </div>
  );
};

export default Header;
