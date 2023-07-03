import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function Consultation() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Consultas do Paciente
    </div>
  );
}

export default Consultation;
