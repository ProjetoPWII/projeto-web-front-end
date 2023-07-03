import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

function HomeDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      Home Médica
    </div>
  );
}

export default HomeDoctor;
