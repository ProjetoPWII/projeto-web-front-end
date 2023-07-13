import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { setupAPIClient } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthMedContext } from "../../context/AuthMedContext";
import { Button } from "react-bootstrap";

function DoctorMedications() {
  const { isDarkMode } = useContext(DarkModeContext);
  const {userDoctor} = useContext(AuthMedContext)

  const [medicacao, setMedicacao] = useState('')
  const navigate = useNavigate()

  const apiClient = setupAPIClient()


  const handleMedicacao = async (event) => {
    event.preventDefault()

    const data = {nome:medicacao}

    try {
      await apiClient.post('/medicacao',data)
      toast.success('Medicação cadastrada')
      navigate('/doctor')
    } catch (error) {
      toast.error('Erro ao cadastrar medicação')
      console.log(error)
    }
  
   

  }



  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={` ${containerClassName}`}>
      {userDoctor && (
          <div className='d-flex justify-content-center"'>

          <form onSubmit={handleMedicacao} className='container d-flex flex-column' encType="multipart/form-data">
            <h3>Cadastro de Medicações</h3>
            <div className="row">
              <div className="col-xl-6 col-sm-6">
                <label htmlFor="medicacaoInput">Nome da medicação:</label>
                <input name='nome' onChange={(e) => setMedicacao(e.target.value)} id='medicacaoInput' type="text" className="form-control" placeholder="Nome da medicação" />
              </div>
              <div className="row">
                <div className="col-xl-6 col-sm-12 p-3">
                  <Button type='submit'>Cadastrar</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DoctorMedications;
