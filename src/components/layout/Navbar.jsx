import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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

import Logo from "../../assets/img/medical-team.png";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [userType, setUserType] = useState();

  const switchOnColor = "#ffbf00";
  const switchOffColor = "#d9dcd6";

  const navbarClassName = isDarkMode
    ? `${styles.navbar} ${styles["navbar-dark"]}`
    : styles.navbar;

  return (
    <nav className={navbarClassName}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="logo" />
        <h2>MedSaúde</h2>
      </div>
      <ul>
        <li>
          <GoSignIn size={22} color="white" />
          <Link to="#entrar">Entrar</Link>
        </li>

        {userType === "paciente" && (
          <>
            <li>
              <GoHome size={22} color="white" />
              <Link to="#home">Home</Link>
            </li>

            <li>
              <FaRegIdCard size={22} color="white" />
              <Link to="#perfil">Perfil</Link>
            </li>

            <li>
              <GiMedicinePills size={22} color="white" />
              <Link to="#">Medicação</Link>
            </li>

            <li>
              <RiUserVoiceLine size={22} color="white" />
              <Link to="#">Consultas</Link>
            </li>

            <li>
              <IoTicket size={22} color="white" />
              <Link to="#">Fichas</Link>
            </li>

            <li>
              <FaUserMd size={22} color="white" />
              <Link to="#">Plantões</Link>
            </li>

            <li>
              <GoSignOut size={22} color="white" />
              <Link to="#sair">Sair</Link>
            </li>
          </>
        )}

        {userType === "médico" && (
          <>
            <li>
              <GoHome size={22} color="white" />
              <Link to="#home">Home</Link>
            </li>

            <li>
              <FaRegIdCard size={22} color="white" />
              <Link to="#perfil">Perfil</Link>
            </li>

            <li>
              <RiUserVoiceLine size={22} color="white" />
              <Link to="#">Consultas</Link>
            </li>

            <li>
              <FaUserMd size={22} color="white" />
              <Link to="#">Plantões</Link>
            </li>

            <li>
              <FaFileSignature size={22} color="white" />
              <Link to="#">Prescrições</Link>
            </li>

            <li>
              <GiMedicinePills size={22} color="white" />
              <Link to="#">Medicações</Link>
            </li>

            <li>
              <TbUserHeart size={22} color="white" />
              <Link to="#">Status do Paciente</Link>
            </li>

            <li>
              <GoSignOut size={22} color="white" />
              <Link to="#sair">Sair</Link>
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
      </div>
    </nav>
  );
}

export default Navbar;
