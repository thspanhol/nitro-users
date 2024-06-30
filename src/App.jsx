import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";
import ShowUsers from "./components/showUsers";
import DeleteUser from "./components/deleteUser";
import Welcome from "./components/welcome";

function App() {
  const [main, setMain] = useState("Welcome");
  const [dataBase, setDataBase] = useState("Carregando");

  const getData = async () => {
    fetch("https://crud-node-a7h4.onrender.com/usuarios")
      .then((response) => response.json())
      .then((data) => setDataBase(data))
      .catch((error) => console.error("Error:", error));
  };

  const validaSenha = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const validaEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <Header setMain={setMain} />
      {main === "Welcome" && <Welcome dataBase={dataBase} getData={getData} />}
      {main === "CreateUser" && (
        <CreateUser
          dataBase={dataBase}
          getData={getData}
          validaSenha={validaSenha}
          validaEmail={validaEmail}
        />
      )}
      {main === "EditUser" && (
        <EditUser
          dataBase={dataBase}
          getData={getData}
          validaSenha={validaSenha}
          validaEmail={validaEmail}
        />
      )}
      {main === "ShowUsers" && (
        <ShowUsers dataBase={dataBase} getData={getData} />
      )}
      {main === "DeleteUser" && (
        <DeleteUser dataBase={dataBase} getData={getData} />
      )}
    </>
  );
}

export default App;
