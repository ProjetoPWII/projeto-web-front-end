import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { setupAPIClient } from '../../api/api'
import { Link } from 'react-router-dom'

const DoctorConsulta = () => {

    const param = useParams()
    const apiClient = setupAPIClient()
    const [consulta, setConsulta] = useState()
    const [medicacoes, setMedicacoes] = useState()

    useEffect(() => {
        async function getConsulta() {
            const resp = await apiClient.get(`/consultas/${param.id}`)
            resp.data['data_plantao'] = new Date(resp.data['data_plantao'])
            setConsulta(resp.data)
            const resp2 = await apiClient.get('/medicacoes-prescritas/all')

            console.log(resp2.data)

            const med = resp2.data.filter(med=>med['prescricao'].id_consulta==param.id)
            console.log('med:',med)
            setMedicacoes(med)
        }

        getConsulta()

    }, [])

    console.log('medicacoes',medicacoes)

    return (
        <>

            {
                consulta && medicacoes && (
                    <div className="card" style={{ width: "100%" }}>
                        <img className="card-img-top" src="https://t4.ftcdn.net/jpg/01/33/33/41/360_F_133334155_X23HzbJKawbIgXVaub4bPM8CjpkS5uMS.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{consulta['data_plantao'] ? `Dia ${consulta['data_plantao'].getDate()
                                } do ${consulta['data_plantao'].getMonth() + 1} de ${consulta['data_plantao'].getFullYear()}` : "Sem data"}</h5>
                            <p className="card-text">
                                <b>Observações: </b>
                                {consulta['StatusPaciente'].length > 0 ? `${consulta['StatusPaciente'][0].observacoes}` : "Sem observações"}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Pressão arterial: </b>
                                {consulta['StatusPaciente'].length > 0 ? `${consulta['StatusPaciente'][0].pressao_arterial}` : "Pressão não registrada"}
                            </li>
                            <li className="list-group-item">
                                <b>Peso: </b>
                                {consulta['StatusPaciente'].length > 0 ? `${consulta['StatusPaciente'][0].peso}` : "Peso não registrado"}
                            </li>
                            {/* <li className="list-group-item">Vestibulum at eros</li> */}
                        </ul>
                        <div className="card-body">
                                <b>Orientações de medicação: </b>
                                {consulta['Prescricoes'].length > 0 && (
                                    consulta['Prescricoes'].map(prescricao => (
                                        <div>
                                            <p className='text-primary'>
                                                {`${prescricao.orientacoes}`}
                                            </p>
                                            {medicacoes.map((medicacao, index)=>(
                                                <p>{medicacao.medicacao.nome}</p>
                                            ))}
                                            {/* <p>{medicacoes[0].medicacao.nome}</p> */}
                                            <p>Houve Atestado:{prescricao.atestado_medico?"Sim":"Não"}</p>
                                        </div>

                                    ))
                                )}
                                {!consulta['Prescricoes'].length > 0 && (
                                    <p>Sem prescrições</p>
                                )}
                         
                            {/* <p>
                                <b>Orientações: </b>
                                {consulta['Prescricoes'].length > 0 ? `${consulta['Prescricoes'][0].atestado}` : "Sem orientações"}
                            </p> */}
                            {/* <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a> */}
                            <Link to={`consulta/detail/${param.id}`} className='card-link btn btn-primary' >Definir detalhes</Link>
                        </div>
                    </div>
                )
            }


        </>

    )
}

export default DoctorConsulta