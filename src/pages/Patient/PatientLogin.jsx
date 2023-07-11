import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthPacienteContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();

  const { signIn } = useContext(AuthPacienteContext);

  const [numero_sus, setSus] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (numero_sus === "" || senha === "") {
      return;
    }

    const userData = {
      numero_sus,
      senha,
    };

    console.log(userData);

    try {
      await signIn(userData);
      toast.success("Login realizado!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao efetuar Login!");
    }
  }

  return (
    <div className='d-flex justify-content-center"'>
      <form onSubmit={handleLogin} className="container d-flex flex-column">
        <h3>Login de Paciente</h3>
        <div className="row">
          <div className="col-xl-6 col-sm-12">
            <label htmlFor="inputSus">Número do SUS:</label>
            <input
              onChange={(e) => setSus(e.target.value)}
              id="inputSus"
              name="numero_sus"
              type="text"
              className="form-control"
              placeholder="Informe o número do cartão SUS"
            />
          </div>

          <div className="col-xl-6 col-sm-12">
            <label htmlFor="inputSenha">Senha:</label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              id="inputSenha"
              name="senha"
              type="password"
              className="form-control"
              placeholder="Informe sua senha"
            />
          </div>
          <div className="row">
            <div className="col-xl-6 col-sm-12 p-3">
              <Button type="submit">Entrar</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientLogin;
