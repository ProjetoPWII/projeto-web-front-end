import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { setupAPIClient } from "../../api/api";

function Profile() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);

  const containerClassName = isDarkMode ? "dark-container" : "";

  useEffect(() => {
    const apiClient = setupAPIClient();

    async function fetchUser() {
      try {
        const response = await apiClient.get(
          `/paciente/detail/${user.numero_sus}`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Erro ao buscar perfil do usuário:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      {user ? (
        <>
          <div>Numero do SUS: {user.numero_sus}</div>
          <div>Nome: {user.name}</div>
          <div>Idade: {user.idade}</div>
          <div>Endereço: {user.enderoco_id}</div>
          <div>Foto de Perfil: {user.foto_perfil}</div>
          <div>Sexo: {user.sexo}</div>
        </>
      ) : (
        "Carregando perfil do usuário..."
      )}
    </div>
  );
}

export default Profile;
