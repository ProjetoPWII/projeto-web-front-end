import { useState, useEffect,useContext } from "react"
import { useParams } from 'react-router'
import { AuthMedContext } from "../../context/AuthMedContext"
import { setupAPIClient } from "../../api/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const DoctorConsultaDetail = () => {

    const param = useParams()
    const navigate = useNavigate()

    //console.log(param.id)


    const [medicacoes, setMedicacoes] = useState([])
    const [observacoes, setObservacoes] = useState()
    const [pressao, setPressao] = useState()
    const [peso, setPeso] = useState()
    const [orientacoes, setOrientacoes] = useState()
    const [medicacaoSelected, setMedicacaoSelected] = useState()
    const [atestado, setAtestado] = useState()
    const [caixas, setCaixas] = useState()
    const { userDoctor } = useContext(AuthMedContext);
    const apiClient = setupAPIClient()

    useEffect(() => {



        const get = async () => {
            const response = await apiClient.get('/medicacoes')
            setMedicacoes(response.data)
        }


        get()


    }, [])




    const handleSubmit = async (event) => {
        event.preventDefault()

        const status = {
            observacoes,
            pressao_arterial:parseInt(pressao),
            peso:parseInt(peso),
            id_consulta:param.id
        }

        console.log(status)
        const prescricoes = {
            id_consulta:param.id,
            orientacoes,
            atestado_medico:Boolean(atestado)
        }



        try {
            await apiClient.post('/status/update',status)
            const pres = await apiClient.post('/prescricao/edit',prescricoes)
            const med = medicacoes.filter(med => med['nome']==medicacaoSelected)
            const presMed = {
                id_prescricao:pres.data.id,
                qtde_caixas:parseInt(caixas),
                id_medicacao:med[0].id
            }
            console.log(presMed)
            await apiClient.post('/medicacoes-prescritas', presMed)
            toast.success('Informações salvas!')
            navigate('/profileDoctor')
            
        } catch (error) {
            console.log(error)
            toast.error('Falha ao salvar')
        }


    }


    const handleMedicacao = (event) => {

        setMedicacaoSelected(event.target.value)

    }




    return (
        <div>
            {userDoctor && (
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Observações:</label>
                            <input onChange={(e)=>setObservacoes(e.target.value)} name='observacoes' type="text" className="form-control" id="inputEmail4" placeholder="Observações sobre o paciente" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Pressão arterial:</label>
                            <input onChange={(e)=>setPressao(e.target.value)} type="text" className="form-control" id="inputPassword4" placeholder="Pressão" />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputAddress">Peso</label>
                        <input onChange={(e)=>setPeso(e.target.value)} name="peso" type="number" className="form-control" id="inputAddress" placeholder="Peso" />
                    </div>
                    {/* <div className="form-group">
                   <label for="inputAddress2">Address 2</label>
                   <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
               </div> */}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputCity">Orientações:</label>
                            <input onChange={(e)=>setOrientacoes(e.target.value)} name="orientacoes" type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputState">Medicações</label>
                            <select name="nome" id="inputState" onChange={handleMedicacao} value={medicacaoSelected} className="form-control">
                                {medicacoes.map((medicacao, index) => (
                                    <option value={medicacao.nome} key={index}>{medicacao.nome}</option>
                                ))}
                                {/* <option selected>Nenhuma</option>
                           <option>...</option> */}
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                       <label for="inputZip">Qtde. de caixas:</label>
                       <input onChange={(e)=>setCaixas(e.target.value)}  name="qtde_caixas" type="number" className="form-control" id="inputZip" />
                   </div>
                    </div>
                    {/* <div className="form-group">
                   <div className="form-check">
                       <input className="form-check-input" type="checkbox" id="gridCheck" />
                       <label className="form-check-label" for="gridCheck">
                           Check me out
                       </label>
                   </div>
               </div> */}
                    <div className="col-xl-6 col-sm-12 p-3">
                        <label htmlFor="sexo">Atestado:</label>

                        <input onChange={(e) => setAtestado(true)} value={true} type="radio" className="btn-check" name="atestado_medico" id="male" autoComplete="off" required />
                        <label style={{ marginLeft: 12 }} className="btn btn-sm btn-outline-secondary" htmlFor="male">Prescrito</label>

                        <input onChange={(e) => setAtestado(false)} value={false} type="radio" className="btn-check ml-6" name="atestado_medico" id="female" autoComplete="off" required />
                        <label style={{ marginLeft: 12 }} className="btn btn-sm btn-outline-secondary" htmlFor="female">Não prescrito</label>

                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            )}
        </div>
    )
}

export default DoctorConsultaDetail