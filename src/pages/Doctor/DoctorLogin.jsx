import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { AuthMedContext } from '../../context/AuthMedContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const DoctorLogin = () => {

    const navigate = useNavigate()


    const { signInDoctor } = useContext(AuthMedContext)



    const [crm, setCrm] = useState('')
    const [senha, setSenha] = useState('')


    async function handleLogin(e) {

        e.preventDefault()

        if (crm === '' || senha === '') {
            return
        }

        const userData = {
            crm,
            senha
        }
        
        console.log(userData)


        try {

            await signInDoctor(userData)
            toast.success('Login realizado!')
            navigate('/')

        } catch (error) {
            console.log(error)
            toast.error('Erro ao efetuar Login!')
        }


    }




    return (
        <div className='d-flex justify-content-center"'>

            <form onSubmit={handleLogin} className='container d-flex flex-column'>
                <h3>Login de Paciente</h3>
                <div className="row">
                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputCrm">CRM:</label>
                        <input onChange={(e) => setCrm(e.target.value)} id='inputCrm' name='crm' type="text" className="form-control" placeholder="Informe o número do cartão SUS" />
                    </div>

                    <div className="col-xl-6 col-sm-12">
                        <label htmlFor="inputSenha">Senha:</label>
                        <input onChange={(e) => setSenha(e.target.value)} id='inputSenha' name='senha' type="password" className="form-control" placeholder="Informe o número do cartão SUS" />
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 p-3">
                            <Button type='submit'>Entrar</Button>
                        </div>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default DoctorLogin