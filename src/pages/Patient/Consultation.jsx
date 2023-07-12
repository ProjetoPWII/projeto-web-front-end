import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { setupAPIClient } from "../../api/api";
import { AuthPacienteContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

function Consultation() {
  const { isDarkMode } = useContext(DarkModeContext);

  const { user } = useContext(AuthPacienteContext)
  const apiClient = setupAPIClient()
  const [consultas, setConsultas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getConsultas() {

      if (user) {
        const resp = await apiClient.get(`/consultas/paciente/${user.numero_sus}`)
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i]['data_plantao'] = new Date(resp.data[i]['data_plantao'])
          const day = resp.data[i]['data_plantao'].getDay() 
          const month = resp.data[i]['data_plantao'].getMonth() 
        if(day < new Date().getDate() &&  month < new Date().getMonth()){
          resp.data[i]['status'] = 'Realizada'
        }
          //setPlantoes([...plantoes, resp.data[i]])
        }
        setConsultas(resp.data)
      }

    }

    getConsultas()

  }, [])


  const getConsulta = async function(consulta_id){
      navigate(`/consulta/${consulta_id}`)
  }


  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      <h3>Suas consultas</h3>
      <div className="d-flex flex-wrap">
        {user && (

          consultas.map((consulta) => (

            <div onClick={()=>getConsulta(consulta['id'])} key={consulta['data_plantao']} className="card m-2 bg-dark text-white"
              style={{width: "18rem", boxShadow: "13px 16px 14px 0px rgba(0, 0, 0, 0.3)", cursor: 'pointer'
              }}>
              <img className="card-img-top" src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{`Consulta dia ${consulta['data_plantao'].getDate()} do ${consulta['data_plantao'].getMonth()+1}`}</h5>
                <p style={{ fontSize: '1.1rem' }} className="card-text text-info"><b>Médico CRM</b>{`:${consulta['medico_crm']}`}</p>
                <p style={{ fontSize: '1.1rem' }} className="card-text"><b>Status</b>{`:${consulta['status']}`}</p>
                {/* <button onClick={() => handleConsulta(plantao['data'], plantao['medico_crm'])} href="#" className="btn btn-primary">Agendar</button> */}
              </div>
            </div>
          )
          )
        )}
      </div>

      {consultas.length === 0 && (
        <h3>Nenhuma consulta encontrada</h3>
      )}

      {!user && (
        <h3>Carregando...</h3>
      )}
    </div>
  );
}

export default Consultation;
