import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function DoctorShifts() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Meus Plantões
    </div>
  );
}

export default DoctorShifts;
