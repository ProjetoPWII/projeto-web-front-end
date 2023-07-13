import { createContext, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../api/apiClient";
import jwt_decode from "jwt-decode";

export const AuthMedContext = createContext();

export function signOutDoctor() {
  try {
    destroyCookie(undefined, "@app_medico.token");
  } catch (error) {
    console.log(error);
  }
}

export function AuthMedProvider({ children }) {
  const [userDoctor, setUserDoctor] = useState();
  const doctorAuthenticated = !!userDoctor;

  useEffect(() => {
    const { "@app_medico.token": token } = parseCookies();
    if (token) {
      console.log("token medico", token);
      api
        .get(`/medico/detail/${jwt_decode(token).numero_sus}`)
        .then((response) => {
          const { nome, crm, endereco_id, sexo, foto_perfil, endereco, idade } =
            response.data;

          setUserDoctor({
            nome,
            crm,
            endereco_id,
            endereco,
            idade,
            sexo,
            foto_perfil,
          });
        })
        .catch((e) => console.log(e));
    }
  }, []);

  async function signInDoctor(data) {
    //data = {numero_sus, senha}

    try {
      // console.log('data',data)
      const response = await api.post("/loginmedico", data);

      const { nome, crm, endereco_id, foto_perfil, endereco,sexo, token } =
        response.data;

      setCookie(undefined, "@app_medico.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "*",
      });

      setUserDoctor({
        nome,
        crm,
        endereco_id,
        endereco,
        sexo,
        foto_perfil,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // console.log(response.data)
    } catch (error) {
      console.log("erro ao logar");
      console.log(error);
    }
  }

  async function signUpDoctor({
    cpf,
    nome,
    idade,
    sexo,
    crm,
    endereco_id,
    foto_perfil,
    senha,
  }) {
    const data = new FormData();

    data.append("cpf", cpf);
    data.append("nome", nome);
    data.append("idade", idade);
    data.append("sexo", sexo);
    data.append("crm", crm);
    data.append("endereco_id", endereco_id);
    data.append("foto_perfil", foto_perfil);
    data.append("senha", senha);

    try {
      await api.post("/medico", data);
    } catch (error) {
      console.log(error);
      // throw new Error('Erro ao registrar')
    }
  }

  return (
    <AuthMedContext.Provider
      value={{
        userDoctor,
        doctorAuthenticated,
        signInDoctor,
        signOutDoctor,
        signUpDoctor,
      }}
    >
      {children}
    </AuthMedContext.Provider>
  );
}
