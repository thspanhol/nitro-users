import { useEffect } from "react";

const Welcome = ({ dataBase, getData }) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>
        {dataBase === "Carregando"
          ? "Carregando Usuários..."
          : "Portal de Usuários"}
      </h1>
    </div>
  );
};

export default Welcome;
