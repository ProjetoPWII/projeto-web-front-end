import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const ConsultaRegister = () => {


    const [sus, setSus] = useState('')

    const navigate = useNavigate()

    const handleConsulta = async (e) => {

        e.preventDefault()

        console.log(e.target.value)

    }


    return (
        <div className='d-flex justify-content-center"'>

            <form onSubmit={handleConsulta} className='container d-flex flex-column' encType="multipart/form-data">
                <h3>Agendar consulta</h3>
                <div className="row">
                    <input defaultValue="A realizar" name='status' type='text' hidden={true} />
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputSus">Número do SUS:</label>
                        <input onChange={(e) => setSus(e.target.value)} id='inputSus' name='numero_sus' type="text" className="form-control" placeholder="Informe o número do cartão SUS" />
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
                </div>
            </form>
        </div>
    )
}

export default ConsultaRegister