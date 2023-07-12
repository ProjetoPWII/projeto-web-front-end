import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { setupAPIClient } from "../../api/api";

function ProfileDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [doctor, setDoctor] = useState(null);

  const containerClassName = isDarkMode ? "dark-container" : "";
  useEffect(() => {
    const apiClient = setupAPIClient();

    async function fetchDoctor() {
      try {
        const response = await apiClient.get(`/medico/detail/${doctor.crm}`);
        setDoctor(response.data);
      } catch (error) {
        console.log("Erro ao buscar perfil do Médico:", error);
      }
    }
    fetchDoctor();
  }, []);

  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      {doctor ? (
        <>
          <div>Numero do CRM: {doctor.crm}</div>
          <div>Nome: {doctor.name}</div>
          <div>Idade: {doctor.idade}</div>
          <div>Endereço: {doctor.enderoco_id}</div>
          <div>Foto de Perfil: {doctor.foto_perfil}</div>
          <div>Sexo: {doctor.sexo}</div>
        </>
      ) : (
        "Carregando perfil do médico..."
      )}
    </div>
  );
}

export default ProfileDoctor;
