import { useEffect } from "react";

const ShowUsers = ({ dataBase, getData }) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Mostrar Usuários</h1>
      {dataBase.map((user) => {
        return (
          <p style={{ fontWeight: "bold" }} key={user.id}>
            Nome: {user.nome} || E-mail: {user.email}
          </p>
        );
      })}
    </div>
  );
};

export default ShowUsers;
