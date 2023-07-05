import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { DarkModeContext } from "../../context/DarkModeContext";

function Register() {
  const [userType, setUserType] = useState();
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";

  let registerText;
  if (userType === "paciente") {
    registerText = "Cadastrar paciente";
  } else if (userType === "médico") {
    registerText = "Cadastrar médico";
  }

  return (
    <div className={`text-center ${containerClassName}`}>
      <h1 className="mb-5 display-4">Cadastro</h1>

      <p>{registerText}</p>

      <Form className="d-inline-block">
        <Form.Group controlId="userType">
          <Form.Check
            type="radio"
            name="userType"
            value="paciente"
            label="Paciente"
            checked={userType === "paciente"}
            onChange={() => setUserType("paciente")}
          />
          <Form.Check
            type="radio"
            name="userType"
            value="médico"
            label="Médico"
            checked={userType === "médico"}
            onChange={() => setUserType("médico")}
          />
        </Form.Group>

        <Button variant="primary"><Link className="text-white" to={`/register-endereco/${userType}`}>Cadastrar</Link></Button>
      </Form>

      <p>
        Já é registrado? <Link className="text-info" to="/login">Clique aqui!</Link>
      </p>
    </div>
  );
}

export default Register;
