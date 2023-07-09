import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useContext } from 'react'
import { AuthMedContext } from '../../context/AuthMedContext'
import { useNavigate } from 'react-router-dom'

const DoctorRegister = () => {

    const {signUpDoctor} = useContext(AuthMedContext)

    const navigate = useNavigate()


    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [crm, setCrm] = useState('')
    const [senha, setSenha] = useState('')
    const [endereco_id, setAdressId] = useState('')
    const [sexo, setSexo] = useState('')
    const [idade, setIdade] = useState()
    const [foto_perfil, setPerfil] = useState(null)


    useEffect(() => {

        const getAddress = localStorage.getItem('address')

        setAdressId(JSON.parse(getAddress).id)

    }, [])



    const handleFile = (e) => {
        console.log(e.target.files)
        setPerfil(e.target.files[0])
    }

    const handleSignUp = async (e) => {

        e.preventDefault()

        let data = {
            cpf,
            nome,
            idade,
            sexo,
            crm,
            endereco_id,
            foto_perfil,
            senha
        }

        console.log(data)

        try {
            await signUpDoctor(data)
            console.log(data)
            toast.success('Cadastro realizado!')
            navigate('/login')

        } catch (error) {
            toast.error('Erro ao cadastrar!')
        }

    }


    return (
        <div className='d-flex justify-content-center"'>

            <form onSubmit={handleSignUp} className='container d-flex flex-column' encType="multipart/form-data">
                <h3>Cadastro de Médico</h3>
                <div className="row">
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="cpfInput">CPF:</label>
                        <input name='cpf' onChange={(e) => setCpf(e.target.value)} id='cpfInput' type="text" className="form-control" placeholder="111.111.111-11" />
                    </div>
                    <input defaultValue={endereco_id} name='endereco_id' type='text' hidden={true} />
                    <div className="col-xl-6">
                        <label htmlFor="inputNome">Nome:</label>
                        <input onChange={(e) => setNome(e.target.value)} name='nome' id='inputNome' type="text" className="form-control" placeholder="Informe seu nome" />
                    </div>
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputIdade">Idade:</label>
                        <input onChange={(e) => setIdade(e.target.value)} name='idade' id='inputIdade' type="number" className="form-control" placeholder="Informe sua idade" />
                    </div>
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputCrm">CRM:</label>
                        <input onChange={(e) => setCrm(e.target.value)} id='inputCrm' name='crm' type="text" className="form-control" placeholder="Informe o número do cartão SUS" />
                    </div>

                    <div className="col-xl-6 col-sm-12 p-3">
                        <label htmlFor="sexo">Sexo:</label>

                        <input onChange={(e) => setSexo("Masculino")} value="Masculino" type="radio" className="btn-check" name="sexo" id="male" autoComplete="off" required />
                        <label style={{ marginLeft: 12 }} className="btn btn-sm btn-outline-secondary" htmlFor="male">Masculino</label>

                        <input onChange={(e) => setSexo("Feminino")} value="Feminino" type="radio" className="btn-check ml-6" name="sexo" id="female" autoComplete="off" required />
                        <label style={{ marginLeft: 12 }} className="btn btn-sm btn-outline-secondary" htmlFor="female">Feminino</label>

                    </div>
                    <div className="col-xl-6 col-sm-12 p-3">
                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="customFile">Foto de Perfil:</label>
                            <input onChange={handleFile} name='foto_perfil' type="file" className="custom-file-input" id="customFile" accept='image/png, image/jpeg, image/jpg' />
                        </div>
                    </div>

                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputSenha">Senha:</label>
                        <input onChange={(e) => setSenha(e.target.value)} id='inputSenha' name='senha' type="password" className="form-control" placeholder="Informe uma senha" />
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

export default DoctorRegister