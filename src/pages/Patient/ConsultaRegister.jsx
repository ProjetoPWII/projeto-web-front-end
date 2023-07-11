import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { setupAPIClient } from "../../api/api"
import { AuthPacienteContext } from "../../context/AuthContext"
import { useContext } from "react"

const ConsultaRegister = () => {


    const [plantoes, setPlantoes] = useState([])

    const { user } = useContext(AuthPacienteContext)

    //  console.log('userrrr', user)

    const sus = user.numero_sus

    useEffect(() => {
        const apiClient = setupAPIClient()

        async function getPlantoes() {
            const resp = await apiClient.get('/plantoes')
            // console.log(resp.data[0].data)
       //     const d = new Date(resp.data[0].data)

            const actualDay = new Date()
           // const day = actualDay.getDay()
            const month = actualDay.getMonth()

            console.log('resposta', (resp.data))

            for (let i = 0; i < resp.data.length; i++) {
                resp.data[i]['data'] = new Date(resp.data[i]['data'])
                console.log(   resp.data[i]['data'].getMonth(), month)
                if (resp.data[i]['data'].getMonth() >= month) {
                    //  plantoes.push(plantao)
                    setPlantoes([...plantoes, resp.data[i]])
                }
            }



            // for (let plantao of resp.data) {
            //     plantao['data'] = new Date(plantao['data'])
            //     if (plantao['data'] >= actualDay) {
            //       //  plantoes.push(plantao)
            //       setPlantoes([...plantao,plantao])
            //     }
            // }



            const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']






            // const startDate = new Date(d.getFullYear(), 0, 1);
            // var days = Math.floor((d - startDate) /
            //     (24 * 60 * 60 * 1000));

            // var weekNumber = Math.ceil(days / 7);

            // Display the calculated result      
            // console.log("Week number of " + d +
            //     " is :   " + weekNumber);
            //console.log(d)
            // console.log(d.getDate())
            // console.log(d.getDay())

        }

        getPlantoes()

    }, [])

    console.log('plantoes', plantoes)


    //  const [sus, setSus] = useState('')

    const navigate = useNavigate()

    const handleConsulta = async (data, crm) => {

        // e.preventDefault()

        const apiClient = setupAPIClient()

       const  resp = await apiClient.post('/ficha', {numero_sus:sus})




        const consulta = {
            status:'A realizar',
            id_ficha: resp.data['id'],
            numero_sus:sus,
            medico_crm:crm,
            data_plantao:data
        }


        

        console.log(e.target.value)

    }


    return (
        <div className='d-flex justify-content-center flex-column'>
            <div className='container d-flex flex-row flex-wrap'>

                {plantoes && plantoes.map(
                    (plantao) => (

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img className="card-img-top" src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{`Dia ${plantao['data'].getDate()}`}</h5>
                                <p className="card-text">{`Médico CRM:${plantao['medico_crm']}`}</p>
                                <p className="card-text">{`Atendimentos:${plantao['num_atendimentos']}`}</p>
                                <a onClick={handleConsulta(plantao['data'], plantao['medico_crm'])} href="#" className="btn btn-primary">Agendar</a>
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