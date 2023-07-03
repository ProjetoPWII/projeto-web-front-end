import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function Shifts() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Médicos Plantonistas
    </div>
  );
}

export default Shifts;
