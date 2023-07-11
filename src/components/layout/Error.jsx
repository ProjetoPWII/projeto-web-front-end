import { useContext } from "react";
import { Link } from "react-router-dom";

import ErrorImage from "../../assets/img/404.svg";
import AccessError from "../../assets/img/401 Error.svg";
import styles from "../styles/Error.module.css";
import { AuthPacienteContext } from "../../context/AuthContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import { DarkModeContext } from "../../context/DarkModeContext";

const Error = () => {
  const { isAuthenticated } = useContext(AuthPacienteContext);
  const { doctorAuthenticated } = useContext(AuthMedContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode
    ? `${styles.container} ${styles["dark"]}`
    : styles.container;
  const contentClassName = isDarkMode
    ? `${styles.content} ${styles["dark"]}`
    : styles.content;

  return (
    <>
      <div className={containerClassName}>
        {isAuthenticated || doctorAuthenticated ? (
          <div className={contentClassName}>
            <img
              src={ErrorImage}
              alt="imagem de erro"
              className={styles.error_image}
            />
            <h2>PAGE NOT FOUND</h2>

            <Link to="/" className={styles.btn}>
              Retorne para a página inicial
            </Link>
          </div>
        ) : (
          <div className={containerClassName}>
            <img
              src={AccessError}
              alt="imagem de erro"
              className={styles.error_image}
            />
            <h2>ACESSO NÃO AUTORIZADO</h2>

            <Link to="/login" className={styles.btn}>
              Realize o login para ter acesso
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Error;
