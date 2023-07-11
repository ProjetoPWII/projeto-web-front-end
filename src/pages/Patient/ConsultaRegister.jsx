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
            const d = new Date(resp.data[0].data)

            const actualDay = new Date()

            console.log('resposta', resp.data)

            for (let plantao of resp.data) {
                plantao['data'] = new Date(plantao['data'])
                if (plantao['data'] >= actualDay) {
                  //  plantoes.push(plantao)
                  setPlantoes([...plantao,plantao])
                }
            }

          

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

    console.log('plantoes',plantoes)


    //  const [sus, setSus] = useState('')

    const navigate = useNavigate()

    const handleConsulta = async (e) => {

        e.preventDefault()

        console.log(e.target.value)

    }


    return (
        <div className='d-flex justify-content-center"'>
            <h3>Agendar consulta</h3>
            <form onSubmit={handleConsulta} className='container d-flex flex-column' encType="multipart/form-data">

                {plantoes && plantoes.map(
                    (plantao) => (

                        <div className="card" style={{ width: "18rem" }}>
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{`Dia ${plantao['data'].getDate()}`}</h5>
                                <p class="card-text">{`Médico CRM:${plantao['medico_crm']}`}</p>
                                <a href="#" class="btn btn-primary">Agendar</a>
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
            </form>
        </div>
    )
}

export default ConsultaRegister