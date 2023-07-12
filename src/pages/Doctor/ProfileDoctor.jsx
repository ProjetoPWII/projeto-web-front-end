import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { setupAPIClient } from "../../api/api";
import { AuthMedContext } from "../../context/AuthMedContext";

function ProfileDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { userDoctor } = useContext(AuthMedContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  useEffect(() => {
    const apiClient = setupAPIClient();

    async function fetchDoctor() {
      try {
        const response = await apiClient.get(`/medico/detail/${doctor.crm}`);
        userDoctor(response.data);
      } catch (error) {
        console.log("Erro ao buscar perfil do Médico:", error);
      }
    }
    fetchDoctor();
  }, []);

  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      {userDoctor ? (
        <>
          <div>Numero do CRM: {userDoctor.crm}</div>
          <div>Nome: {userDoctor.name}</div>
          <div>Idade: {userDoctor.idade}</div>
          <div>Endereço: {userDoctor.enderoco_id}</div>
          <div>Foto de Perfil: {userDoctor.foto_perfil}</div>
          <div>Sexo: {userDoctor.sexo}</div>
        </>
      ) : (
        "Carregando perfil do médico..."
      )}
    </div>
  );
}

export default ProfileDoctor;
