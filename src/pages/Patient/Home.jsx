import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { BsFillCalendar2HeartFill } from 'react-icons/bs'
import { AuthPacienteContext } from "../../context/AuthContext";
import { setupAPIClient } from "../../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthPacienteContext)
  const apiClient = setupAPIClient()
  const [consultas, setConsultas] = useState([])
  const [proximaConsulta, setProximaConsulta] = useState(null)

  const navigate = useNavigate()
  useEffect(() => {
    async function getConsultas() {

      if (user) {
        const resp = await apiClient.get(`/consultas/paciente/${user.numero_sus}`)
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i]['data_plantao'] = new Date(resp.data[i]['data_plantao'])
          //setPlantoes([...plantoes, resp.data[i]])
        }
        setConsultas(resp.data)
      }

    }

    getConsultas()

  }, [])


  useEffect(() => {
    let maiorData = new Date()
    let crm = ''
    let status = ''
    let id = ''

    async function getProximaConsulta() {

      if (consultas.length > 0) {
        for (let i = 0; i < 1; i++) {
          console.log('consultaaaaas', consultas)
          maiorData = consultas[i]['data_plantao']
          crm = consultas[i]['medico_crm']
          status = consultas[i]['status']
          id = consultas[i]['id']
          for (let j = 1; j < consultas.length; j++) {
            if (consultas[j]['data_plantao'] > maiorData) {
              maiorData = consultas[j]
              crm = consultas[j]['medico_crm']
              status = consultas[j]['status']
              id = consultas[j]['id']
            }
          }
        }
        setProximaConsulta({ maiorData, crm, status,id })
      }


    }

    getProximaConsulta()

  }, [consultas])


 const consultaDetail = async () => {
    navigate(`/consulta/${proximaConsulta.id}`)
 }

 //console.log(proximaConsulta.maiorData['data_plantao'])
  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>
      <h3 style={{ alignSelf: 'flex-start' }}>Próxima consulta:</h3>
      {user && proximaConsulta && (
        <>

          <div onClick={()=>consultaDetail()} className="d-flex  justify-content-center align-items-center flex-wrap">
            <div style={{ width: "18rem",cursor:'pointer' }} className="card m-2 bg-dark text-white">
              <img className="card-img-top" src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{`Dia ${proximaConsulta.maiorData['data_plantao'].getDate()} do ${proximaConsulta.maiorData['data_plantao'].getMonth() + 1}`}</h5>
                <p style={{ fontSize: '1.1rem' }} className="card-text text-info"><b>Médico CRM</b>{`:${proximaConsulta['crm']}`}</p>
                <p style={{ fontSize: '1.1rem' }} className="card-text"><b>Status</b>{`:${proximaConsulta['status']}`}</p>
              </div>
            </div>
            <div>
            <p className="text-info" style={{ fontSize: '1.2rem' }}>Esteja atento e não esqueça sua consulta!</p>
            <p className="" style={{ fontSize: '1rem' }}>Pode sempre usar o sistema para relembrar e agendar novas.</p>
            </div>
          
        
          </div>
        </>
      )}

      {!consultas.length > 0 && (
        <div className="d-flex flex-column align-items-center p-5">
          <h1>Suas Consultas</h1>
          <h5>Você não possui consultas</h5>
          <BsFillCalendar2HeartFill size={50} color="green" />
          <Link className="p-2" style={{ fontSize: '1.1rem' }} to={'/consulta/new'}>Agendar nova consulta</Link>
        </div>
      )}

      {!user && (
        <div className="d-flex flex-column align-items-center p-5">
          <h5>Carregando...</h5>
        </div>
      )}

    </div>
  );
}

export default Home;
