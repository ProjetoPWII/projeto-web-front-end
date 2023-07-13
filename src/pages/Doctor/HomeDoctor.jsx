import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import { BsFillCalendar2HeartFill } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { setupAPIClient } from "../../api/api";
import { useNavigate } from "react-router-dom";


function HomeDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { userDoctor } = useContext(AuthMedContext)
  const [plantoes, setPlantoes] = useState([])
  const [proximaConsulta, setProximaConsulta] = useState(null)
  const apiClient = setupAPIClient()
  const navigate = useNavigate()
  useEffect(() => {
    async function getPlantoes() {

      if (userDoctor) {
        const resp = await apiClient.get(`/consultas/medico/${userDoctor.crm}`)
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i]['data_plantao'] = new Date(resp.data[i]['data_plantao'])
          //setPlantoes([...plantoes, resp.data[i]])
        }
        setPlantoes(resp.data)
      }

    }

    getPlantoes()

  }, [])



  useEffect(() => {
    let maiorData = new Date()
    let crm = ''
    let status = ''
    let id = ''

    async function getProximaConsulta() {

      if (plantoes.length > 0) {
        for (let i = 0; i < 1; i++) {
          console.log('plantoes', plantoes)
          maiorData = plantoes[i]['data_plantao']
          crm = plantoes[i]['medico_crm']
          status = plantoes[i]['status']
          id = plantoes[i]['id']
          for (let j = 1; j < plantoes.length; j++) {
            if (plantoes[j]['data_plantao'] > maiorData) {
              maiorData = plantoes[j]
              crm = plantoes[j]['medico_crm']
              status = plantoes[j]['status']
              id = plantoes[j]['id']
            }
          }
        }
        setProximaConsulta({ maiorData, crm, status, id })
      }


    }

    getProximaConsulta()

  }, [plantoes])



  const consultaDetail = async () => {
    navigate(`/consulta/${proximaConsulta.id}`)
  }



  const containerClassName = isDarkMode ? "dark-container" : "";
  return (
    <div className={`text-center display-2 ${containerClassName}`}>

      {userDoctor && proximaConsulta && (
        <>
          <h3 style={{ alignSelf: 'flex-start' }}>Próximo atendimento:</h3>
          <div onClick={() => consultaDetail()} className="d-flex  justify-content-center align-items-center flex-wrap">
            <div style={{ width: "18rem", cursor: 'pointer' }} className="card m-2 bg-dark text-white">
              <img className="card-img-top" src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{`Dia ${proximaConsulta.maiorData['data_plantao'].getDate()} do ${proximaConsulta.maiorData['data_plantao'].getMonth() + 1}`}</h5>
                <p style={{ fontSize: '1.1rem' }} className="card-text text-info"><b>Médico CRM</b>{`:${proximaConsulta['crm']}`}</p>
                <p style={{ fontSize: '1.1rem' }} className="card-text"><b>Status</b>{`:${proximaConsulta['status']}`}</p>
              </div>
            </div>
            <div>
              <p className="text-info" style={{ fontSize: '1.2rem' }}>Este é o seu próximo expediente!</p>
              <p className="" style={{ fontSize: '1rem' }}>Pode sempre usar o sistema para relembrar e agendar novos plantões.</p>
            </div>


          </div>
        </>
      )}

      {!plantoes.length > 0 && userDoctor && (
        <div className="d-flex flex-column align-items-center p-5">
          <h1>Seus plantões</h1>
          <h5>Você não possui plantões ainda</h5>
          <BsFillCalendar2HeartFill size={50} color="green" />
          <Link className="p-2" style={{ fontSize: '1.1rem' }} to={'/consulta/new'}>Definir plantões</Link>
        </div>
      )}

      {!userDoctor && (
        <div className="d-flex flex-column align-items-center p-5">
          <h5>Não há nada por enquanto...</h5>
          <p className="text-info" style={{ fontSize: "1.1rem" }}>Crie uma conta para usar o sistema.</p>
        </div>
      )}

    </div>
  );
}

export default HomeDoctor;
