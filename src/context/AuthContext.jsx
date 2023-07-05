import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { api } from "../api/apiClient";



export const AuthPacienteContext = createContext({})


export function signOut(){
    try {
        destroyCookie(undefined,'@app-paciente.token')
    } catch (error) {
        console.log(error)
    }
}


export function AuthProvider({ children }) {



    const [user, setUser] = useState()
    const isAuthenticated = !!user;


    useEffect(() => {
        const { '@app_paciente.token': token } = parseCookies()
        if (token) {
            api.get('/paciente')
                .then(response => {
                    const { id, nome, numero_sus, endereco_id } = response.data

                    setUser({
                        id,
                        nome,
                        numero_sus,
                        endereco_id
                    })
                })
                .catch(e => signOut())
        }
    }, [])

    async function signIn(data) {

       //data = {numero_sus, senha}
  
        try {
            console.log('data',data)
            const response = await api.post('/login',data)


            const { id, nome, numero_sus, endereco_id, token } = response.data

            setCookie(undefined, '@app_paciente.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "*"
            })


            setUser({
                id,
                nome,
                numero_sus,
                endereco_id
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`


            // console.log(response.data)
        } catch (error) {
            console.log('erro ao logar')
            console.log(error)
        }
    }


    async function signUp({ cpf, nome, idade, numero_sus, endereco_id, sexo, foto_perfil, senha }) {


        const data = new FormData()

        data.append('cpf', cpf)
        data.append('nome', nome)
        data.append('idade', idade)
        data.append('numero_sus', numero_sus)
        data.append('endereco_id', endereco_id)
        data.append('sexo', sexo)
        data.append('foto_perfil', foto_perfil)
        data.append('senha', senha)

        try {
            await api.post('/paciente', data)
            // await api.post('/paciente', {
            //     cpf,
            //     nome,
            //     idade,
            //     numero_sus,
            //     endereco_id,
            //     sexo,
            //     foto_perfil,
            //     senha
            // })


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthPacienteContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthPacienteContext.Provider>
    )

}