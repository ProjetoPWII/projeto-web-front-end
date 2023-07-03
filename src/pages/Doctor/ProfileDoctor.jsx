import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function ProfileDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Perfil Médico
    </div>
  );
}

export default ProfileDoctor;
