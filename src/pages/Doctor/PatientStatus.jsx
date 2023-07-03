import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function PatientStatus() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Status do Paciente
    </div>
  );
}

export default PatientStatus;
