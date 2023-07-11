import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { DarkModeContext } from "../../context/DarkModeContext";

function Login() {
  const [userType, setUserType] = useState();
  const { isDarkMode } = useContext(DarkModeContext);

  const containerClassName = isDarkMode ? "dark-container" : "";

  let loginText;
  if (userType === "paciente") {
    loginText = "Realize o login como paciente";
  } else if (userType === "médico") {
    loginText = "Realize o login como médico";
  }

  return (
    <div className={`text-center ${containerClassName}`}>
      <h1 className="mb-5 display-4">Login</h1>

      <p>{loginText}</p>

      <Form className="d-inline-block">
        <Form.Group className="mb-4" controlId="userType">
          <Form.Check
            className="form-check-inline"
            type="radio"
            name="userType"
            value="paciente"
            label="Paciente"
            checked={userType === "paciente"}
            onChange={() => setUserType("paciente")}
          />
          <Form.Check
            className="form-check-inline"
            type="radio"
            name="userType"
            value="médico"
            label="Médico"
            checked={userType === "médico"}
            onChange={() => setUserType("médico")}
          />
        </Form.Group>

        <Button className="mb-3" variant="primary">
          <Link className="text-white" to={`/login/${userType}`}>
            Ir para Login
          </Link>
        </Button>
      </Form>

      <p>
        Não é registrado?{" "}
        <Link className="text-info" to={`/register`}>
          Clique aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
