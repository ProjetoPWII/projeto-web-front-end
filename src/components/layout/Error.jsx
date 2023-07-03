// import { useContext } from "react";
import { Link } from "react-router-dom";

import ErrorImage from "../../assets/img/404.svg";
import AccessError from "../../assets/img/401 Error.svg";

const Error = () => {
  return (
    <>
      <div className="error">
        <div>
          <img src={ErrorImage} alt="imagem de erro" />
          <h2>PAGE NOT FOUND</h2>
          <p>
            <Link to="/">Retorne para a página inicial</Link>
          </p>
        </div>
      </div>
      <div className="acesso-negado">
        <div>
          <img src={AccessError} alt="imagem de erro" />
          <h2>ACESSO NÃO AUTORIZADO</h2>
          <p>
            <Link to="/login">Realize o login para ter acesso</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
