import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";

//import { signOut } from "../../context/AuthContext";
import { signOut } from "../context/AuthContext";

export function setupAPIClient(ctx = undefined){

    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL:'http://localhost:3003',
        headers:{
            Authorization:`Bearer ${cookies['@app_paciente.token']? cookies['@app_paciente.token']:cookies['@app_medico.token']}`,
        }
    })

    api.interceptors.response.use(response=>{
        return response
    },
    (error)=>{
        if(error.response.status===401){
            //unauthorized
            if(typeof window !== undefined){
                //logout
                signOut()
            }else{
                return Promise.reject(new Error('Error'))
            }
        }

        return Promise.reject(error)
    })

    return api

}