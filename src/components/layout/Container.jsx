import { useContext } from "react";
import styles from "../styles/Container.module.css";
import { DarkModeContext } from "../../context/DarkModeContext";

const Container = ({ children }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const containerClassName = isDarkMode
    ? `${styles.container} ${styles["container-dark"]}`
    : styles.container;

  return <main className={containerClassName}>{children}</main>;
};

export default Container;
