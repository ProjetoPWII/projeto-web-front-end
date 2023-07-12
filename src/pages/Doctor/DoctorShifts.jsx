import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import { setupAPIClient } from "../../api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DoctorShifts() {
  const { isDarkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const { userDoctor } = useContext(AuthMedContext);
  const [dataPlantao, setData] = useState(null)
  const [num, setNum] = useState(10);

  const crm = userDoctor.crm

  console.log(crm)


  const handlePlantao = async (event) => {

    event.preventDefault()

    let data = { data: new Date(dataPlantao), medico_crm: crm, num_atendimentos: parseInt(num) }

    const apiClient = setupAPIClient();

    console.log(data)

    try {


      const resp = await apiClient.post('plantao', data)
      toast.success('Plantão registrado com sucesso!')
      navigate('/doctor')

    } catch (error) {
      console.log(error)
      toast.error('Erro ao registrar plantão!')
    }

  }

  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      <div className='d-flex justify-content-center"'>
        <form onSubmit={handlePlantao} className='container d-flex flex-column' encType="multipart/form-data">
          <h3>Defina a data do plantão</h3>
          <div className="row">
            <input defaultValue={crm} name='medico_crm' type='text' hidden={true} />
            <div className="col-xl-6 col-sm-12">
              <label style={{fontSize:'1.1rem'}} htmlFor="inputData">Data:</label>
              <input onChange={(e) => setData(e.target.value)} id='inputData' name='data_plantao' type="date" className="form-control" placeholder="Informe o número do cartão SUS" />
            </div>
            <div className="col-xl-6 col-sm-12">
              <label style={{fontSize:'1.1rem'}} htmlFor="inputNum">Número máximo de atendimentos:</label>
              <input onChange={(e) => setNum(e.target.value)} id='inputNum' name='num_atendimento' type="number" className="form-control" placeholder="Informe o número do cartão SUS" />
            </div>
            <div className="row">
              <div className="col-xl-6 col-sm-12 p-3">
                <Button type='submit'>Cadastrar</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorShifts;
