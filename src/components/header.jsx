const Header = ({ setMain }) => {
  return (
    <div>
      <img
        src="https://seeklogo.com/images/N/nitronews-email-marketing-logo-8BE182F769-seeklogo.com.png"
        className="logo nitro"
        alt="Nitro logo"
        onClick={() => setMain("Welcome")}
      />
      <div>
        <button style={{ margin: "2px" }} onClick={() => setMain("CreateUser")}>
          Criar Usuário
        </button>
        <button style={{ margin: "2px" }} onClick={() => setMain("EditUser")}>
          Alterar Usuário
        </button>
        <button style={{ margin: "2px" }} onClick={() => setMain("ShowUsers")}>
          Mostrar Usuários
        </button>
        <button style={{ margin: "2px" }} onClick={() => setMain("DeleteUser")}>
          Excluir Usuário
        </button>
      </div>
    </div>
  );
};

export default Header;
