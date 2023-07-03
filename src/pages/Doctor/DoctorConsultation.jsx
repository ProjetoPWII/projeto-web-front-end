import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function DoctorConsultation() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Consultas Médicas
    </div>
  );
}

export default DoctorConsultation;
