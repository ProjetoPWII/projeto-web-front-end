import { useNavigate } from "react-router-dom";
import { setupAPIClient } from "../../api/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const PatientAddress = () => {
  const [address, setAdress] = useState();

  const navigate = useNavigate();

  const handleAdress = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setAdress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiClient = setupAPIClient();

    const data = {
      cidade: address.cidade,
      estado: address.estado,
      bairro: address.bairro,
      rua: address.rua,
    };

    console.log(data);

    try {
      const resp = await apiClient.post("/endereco", data);
      localStorage.setItem("address", JSON.stringify(resp.data));

      toast.success("Endereço cadastrado com sucesso!");
      navigate("/register/paciente");
    } catch (error) {
      toast.error("Erro ao cadastrar endereço!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 p-5">
      <h4 className="text-white">
        Por favor, informe primeiro seu endereço antes de prosseguir com o
        cadastro
      </h4>
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">
          Cidade:
        </label>
        <input
          onChange={(e) => handleAdress(e)}
          name="cidade"
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="Nome da cidade"
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress2" className="form-label">
          Estado:
        </label>
        <input
          onChange={(e) => handleAdress(e)}
          name="estado"
          type="text"
          className="form-control"
          id="inputAddress2"
          placeholder="Nome da rua"
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputCity" className="form-label">
          Bairro:
        </label>
        <input
          onChange={(e) => handleAdress(e)}
          name="bairro"
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Nome do bairro"
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress2" className="form-label">
          Rua:
        </label>
        <input
          onChange={(e) => handleAdress(e)}
          name="rua"
          type="text"
          className="form-control"
          id="inputAddress2"
          placeholder="Nome da rua"
          required
        />
      </div>
      <div className="col-12">
        <Button type="submit" className="text-white" variant="primary">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};


export default PatientAddress
