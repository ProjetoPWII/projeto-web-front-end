import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { BsFillCalendar2HeartFill } from 'react-icons/bs'
import { AuthPacienteContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Home() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthPacienteContext)

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      {user && (
        <div className="d-flex flex-column align-items-center p-5">
          <h1>Suas Consultas</h1>
          <h5>Você não possui consultas</h5>
          <BsFillCalendar2HeartFill size={50} color="green" />
          <Link className="p-2" style={{ fontSize: '1.1rem' }} to={'/consulta/new'}>Agendar nova consulta</Link>
        </div>
      )}

    </div>
  );
}

export default Home;
