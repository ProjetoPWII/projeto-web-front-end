import { useContext } from "react";
import styles from "../styles/Footer.module.css";
import { DarkModeContext } from "../../context/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const footerClassName = isDarkMode
    ? `${styles.footer} ${styles["footer-dark"]}`
    : styles.footer;

  return (
    <footer className={footerClassName}>
      <p>
        <span>MedSaúde Projeto PWII</span> &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
