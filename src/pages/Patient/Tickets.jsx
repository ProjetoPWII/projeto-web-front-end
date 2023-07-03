import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function Tickets() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Fichas Restantes
    </div>
  );
}

export default Tickets;
