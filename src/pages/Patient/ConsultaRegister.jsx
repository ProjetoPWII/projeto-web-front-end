import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { setupAPIClient } from "../../api/api"
import { AuthPacienteContext } from "../../context/AuthContext"
import { useContext } from "react"
import { toast } from "react-toastify"

const ConsultaRegister = () => {


    const [plantoes, setPlantoes] = useState([])
    const [consultaId,setConsulta] = useState()

    const { user } = useContext(AuthPacienteContext)

    const sus = user.numero_sus

    useEffect(() => {
        const apiClient = setupAPIClient()

        async function getPlantoes() {
            const resp = await apiClient.get('/plantoes')
     
            for (let i = 0; i < resp.data.length; i++) {
                resp.data[i]['data'] = new Date(resp.data[i]['data'])
                resp.data[i]['num_atendimentos'] =  resp.data[i]['num_atendimentos'] - resp.data[i]['Consulta'].length
            }
            setPlantoes(resp.data)

        }

        getPlantoes()

    }, [])


    useEffect(() => {

        const getC = localStorage.getItem('proximaConsulta')

        if(getC){
            setConsulta(JSON.parse(getC)['data_plantao'])
        }


    }, [])


    console.log('plantoes', plantoes)


    const navigate = useNavigate()

    const handleConsulta = async (data, crm) => {

    const apiClient = setupAPIClient()

         const  resp = await apiClient.post('/ficha', {numero_sus:sus})

        const consulta = {
            status:'A realizar',
            id_ficha: resp.data['id'],
            numero_sus:sus,
            medico_crm:crm,
            data_plantao:data
        }


        if(consultaId && consultaId == data.toISOString()){
            toast.error('Você já tem uma consulta neste dia')
            return 
        }

        try{
  
            await apiClient.post('/consulta',consulta)
            localStorage.setItem("proximaConsulta", JSON.stringify(consulta));
            toast.success('Consulta agendada!')
            navigate('/')

        }catch(err){
            console.log(err.message)
            toast.error('Erro ao agendar consulta')
        }

    

    }


    return (
        <div className='d-flex justify-content-center flex-column'>
            <h1 className="text-center">Plantões</h1>
            <div className='container d-flex flex-row flex-wrap'>

                {plantoes && plantoes.map(
                    (plantao) => (

                        <div key={plantao.data} className="card m-2 bg-dark text-white" style={{ width: "18rem" }}>
                            <img className="card-img-top" src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{`Dia ${plantao['data'].getDate()} do ${plantao['data'].getMonth()+1}`}</h5>
                                <p className="card-text"><b>Médico</b>{`:${plantao['medico'].nome}`}</p>
                                <p className="card-text text-info"><b>CRM:</b>{`:${plantao['medico_crm']}`}</p>
                                <p className="card-text"><b>Vagas</b>{`:${plantao['num_atendimentos']}`}</p>
                                <button onClick={() => handleConsulta(plantao['data'], plantao['medico_crm'])} href="#" className="btn btn-primary">Agendar</button>
                            </div>
                        </div>

                    )
                )}

                {!plantoes && (
                    <h3>Nenhum plantão encontrado</h3>
                )}



                {/* <div className="row">
                    <input defaultValue="A realizar" name='status' type='text' hidden={true} />
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputSus">Número do SUS:</label>
                        <input onChange={(e) => setSus(e.target.value)} id='inputSus' name='numero_sus' type="text" className="form-control" placeholder={sus} />
                    </div>


                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputData">Data:</label>
                        <input onChange={(e) => setSus(e.target.value)} id='inputData' name='data_plantao' type="date" className="form-control" placeholder="Informe o número do cartão SUS" />
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 p-3">
                            <Button type='submit'>Cadastrar</Button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ConsultaRegister