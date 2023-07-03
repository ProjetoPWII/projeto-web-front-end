import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function DoctorPrescriptions() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Minhas Prescrições
    </div>
  );
}

export default DoctorPrescriptions;
