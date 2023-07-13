import { Link } from "react-router-dom";
import { useContext } from "react";
import Switch from "react-switch";

import { GoHome, GoSignIn, GoSignOut } from "react-icons/go";
import { FaRegIdCard, FaUserMd } from "react-icons/fa";
// import { FaFileSignature } from "react-icons/fa";
// import { IoTicket } from "react-icons/io5";
import { GiMedicinePills } from "react-icons/gi";
// import { TbUserHeart } from "react-icons/tb";
import { RiUserVoiceLine } from "react-icons/ri";

import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";

import styles from "../styles/Navbar.module.css";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthPacienteContext } from "../../context/AuthContext";
import { AuthMedContext } from "../../context/AuthMedContext";
// import { useNavigate } from "react-router-dom";

import Logo from "../../assets/img/medical-team.png";
import { Button, Container, Row, Col } from "react-bootstrap";

function Navbar() {
  // const navigate = useNavigate();
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
    <nav className={`navbar ${navbarClassName} navbar-expand-lg`}>
      <Container>
        <Row className="align-itens-center">
          <Col md={6}>
            <div className={styles.navbar_logo}>
              <img src={Logo} alt="logo" />
              <h2>
                <Link to={"/"}>MedSaúde</Link>
              </h2>
            </div>
          </Col>

          <Col md={6}>
            <ul className="navbar-nav ml-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <GoHome size={22} color="white" />
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <FaRegIdCard size={22} color="white" />
                    <Link className="nav-link" to="/userProfile">
                      Perfil
                    </Link>
                  </li>
                  {/* 
            <li>
              <GiMedicinePills size={22} color="white" />
              <Link to="/medication">Medicação</Link>
            </li> */}

                  <li className="nav-item">
                    <RiUserVoiceLine size={22} color="white" />
                    <Link className="nav-link" to="/consultation">
                      Consultas
                    </Link>
                  </li>

                  {/* <li>
              <IoTicket size={22} color="white" />
              <Link to="/tickets">Fichas</Link>
            </li> */}

                  <li className="nav-item">
                    <FaUserMd size={22} color="white" />
                    <Link className="nav-link" to="/consulta/new">
                      Plantões
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Button onClick={makeLogout} className="btn btn-primary">
                      <GoSignOut size={22} color="white" />
                      Sair
                    </Button>
                  </li>
                </>
              ) : userDoctor ? (
                <>
                  <li className="nav-item">
                    <GoHome size={22} color="white" />
                    <Link className="nav-link" to="/doctor">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <FaRegIdCard size={22} color="white" />
                    <Link className="nav-link" to="/profileDoctor">
                      Perfil
                    </Link>
                  </li>

                  {/* <li>
              <RiUserVoiceLine size={22} color="white" />
              <Link to="/doctorConsultations">Consultas</Link>
            </li> */}

                  <li className="nav-item">
                    <FaUserMd size={22} color="white" />
                    <Link className="nav-link" to="/doctorShifts">
                      Plantões
                    </Link>
                  </li>

                  {/* <li>
              <FaFileSignature size={22} color="white" />
              <Link to="/prescriptions">Prescrições</Link>
            </li> */}

                  <li className="nav-item">
                    <GiMedicinePills size={22} color="white" />
                    <Link className="nav-link" to="/doctorMedications">
                      Medicações
                    </Link>
                  </li>

                  {/* <li>
              <TbUserHeart size={22} color="white" />
              <Link to="/patientStatus">Status do Paciente</Link>
            </li> */}

                  <li className="nav-item">
                    <Button
                      onClick={makeDoctorLogout}
                      className="btn btn-prrimary"
                    >
                      <GoSignOut size={22} color="white" />
                      Sair
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <GoSignIn size={22} color="white" />
                    <Link className="nav-link" to="/login">
                      Entrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Col>
        </Row>
      </Container>

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
    </nav>
  );
}

export default Navbar;
