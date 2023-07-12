import { Link } from "react-router-dom";
import { useContext } from "react";
import Switch from "react-switch";

import { GoHome, GoSignIn, GoSignOut } from "react-icons/go";
import { FaRegIdCard, FaFileSignature, FaUserMd } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { GiMedicinePills } from "react-icons/gi";
import { TbUserHeart } from "react-icons/tb";
import { RiUserVoiceLine } from "react-icons/ri";

import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";

import styles from "../styles/Navbar.module.css";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthPacienteContext } from "../../context/AuthContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/img/medical-team.png";
import { Button } from "react-bootstrap";

function Navbar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user, isAuthenticated, signOut } = useContext(AuthPacienteContext);
  const { userDoctor, doctorAuthenticated, signOutDoctor } =
    useContext(AuthMedContext);
  // const [userType, setUserType] = useState();

  const makeLogout = () => {
    signOut();
   // navigate("/login");
    window.location.reload();

  };

  const makeDoctorLogout = () => {
    signOutDoctor();
   // navigate("/login");
   window.location.reload();

  };

  console.log(userDoctor);
  console.log(user);

  const switchOnColor = "#ffbf00";
  const switchOffColor = "#d9dcd6";

  const navbarClassName = isDarkMode
    ? `${styles.navbar} ${styles["navbar-dark"]}`
    : styles.navbar;

  console.log(isAuthenticated);
  console.log(doctorAuthenticated);

  return (
    <nav className={navbarClassName}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="logo" />
        <h2>
          <Link to={"/"}>MedSaúde</Link>
        </h2>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <GoHome size={22} color="white" />
              <Link to="/">Home</Link>
            </li>

            <li>
              <FaRegIdCard size={22} color="white" />
              <Link to="/userProfile">Perfil</Link>
            </li>
{/* 
            <li>
              <GiMedicinePills size={22} color="white" />
              <Link to="/medication">Medicação</Link>
            </li> */}

            <li>
              <RiUserVoiceLine size={22} color="white" />
              <Link to="/consultation">Consultas</Link>
            </li>

            {/* <li>
              <IoTicket size={22} color="white" />
              <Link to="/tickets">Fichas</Link>
            </li> */}

            <li>
              <FaUserMd size={22} color="white" />
              <Link to="/consulta/new">Plantões</Link>
            </li>

            <li>
              <Button onClick={makeLogout}>
                <GoSignOut size={22} color="white" />
                Sair
              </Button>
            </li>
          </>
        ) : userDoctor ? (
          <>
            <li>
              <GoHome size={22} color="white" />
              <Link to="/doctor">Home</Link>
            </li>

            <li>
              <FaRegIdCard size={22} color="white" />
              <Link to="/profileDoctor">Perfil</Link>
            </li>

            <li>
              <RiUserVoiceLine size={22} color="white" />
              <Link to="/doctorConsultations">Consultas</Link>
            </li>

            <li>
              <FaUserMd size={22} color="white" />
              <Link to="/doctorShifts">Plantões</Link>
            </li>

            <li>
              <FaFileSignature size={22} color="white" />
              <Link to="/prescriptions">Prescrições</Link>
            </li>

            <li>
              <GiMedicinePills size={22} color="white" />
              <Link to="/doctorMedications">Medicações</Link>
            </li>

            <li>
              <TbUserHeart size={22} color="white" />
              <Link to="/patientStatus">Status do Paciente</Link>
            </li>

            <li>
              <Button onClick={makeDoctorLogout}>
                <GoSignOut size={22} color="white" />
                Sair
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <GoSignIn size={22} color="white" />
              <Link to="/login">Entrar</Link>
            </li>
          </>
        )}
      </ul>

      <div className={styles.darkModeToggle}>
        <div className={styles.iconLeft}>
          <FiSun size={26} color={switchOnColor} />
        </div>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          onColor={switchOffColor}
          offColor={switchOnColor}
          checkedIcon={false}
          uncheckedIcon={false}
          height={33}
          width={53}
          handleDiameter={28}
        />
        <div className={styles.iconRight}>
          <IoMoon size={26} color={switchOffColor} />
        </div>
      </div>
      {/* 
      <div className={styles.userTypeToggle}>
        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="paciente"
            name="userType"
            value="paciente"
            checked={userType === "paciente"}
            onChange={() => setUserType("paciente")}
          />
          <label htmlFor="paciente">Paciente</label>
        </div>
        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="medico"
            name="userType"
            value="médico"
            checked={userType === "médico"}
            onChange={() => setUserType("médico")}
          />
          <label htmlFor="medico">Médico</label>
        </div>
      </div> */}
    </nav>
  );
}

export default Navbar;
