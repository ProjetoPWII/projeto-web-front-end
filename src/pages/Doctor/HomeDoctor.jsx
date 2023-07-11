import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import {BsFillCalendar2HeartFill} from 'react-icons/bs'
import { Link } from "react-router-dom";

function HomeDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);
  const {userDoctor} = useContext(AuthMedContext)

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      {userDoctor && (
        <div className="d-flex flex-column align-items-center p-5">
          <h1>Seus Plantões</h1>
          <h5>Você não definiu plantões ainda</h5>
          <BsFillCalendar2HeartFill size={50} color="green" />
          <Link className="p-2" style={{ fontSize: '1.1rem' }} to={'/doctorShifts'}>Definir plantões</Link>
        </div>
      )}
    </div>
  );
}

export default HomeDoctor;
