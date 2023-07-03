import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function Medication() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Medicações
    </div>
  );
}

export default Medication;
