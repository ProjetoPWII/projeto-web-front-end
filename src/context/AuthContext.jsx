import { createContext, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../api/apiClient";
import jwt_decode from "jwt-decode";

export const AuthPacienteContext = createContext();

export function signOut() {
  try {
    destroyCookie(undefined, "@app_paciente.token");
  } catch (error) {
    console.log(error);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@app_paciente.token": token } = parseCookies();
    //    console.log(token)
    if (token) {
      api
        .get(`/paciente/detail/${jwt_decode(token).numero_sus}`)
        .then((response) => {
          console.log("response", response);
          const { nome, numero_sus, endereco_id, sexo,endereco, foto_perfil, idade } =
            response.data;

          setUser({
            nome,
            numero_sus,
            endereco_id,
            foto_perfil,
            sexo,
            idade,
            endereco
          });
        })
        .catch((e) => console.log(e));
    }
  }, []);

  async function signIn(data) {
    //data = {numero_sus, senha}

    try {
      // console.log('data',data)
      const response = await api.post("/login", data);

      const { nome, numero_sus, endereco_id, token, sexo,idade, foto_perfil } =
        response.data;

      setCookie(undefined, "@app_paciente.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "*",
      });

      setUser({
        nome,
        numero_sus,
        endereco_id,
        sexo,
        idade,
        foto_perfil,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // console.log(response.data)
    } catch (error) {
      console.log("erro ao logar");
      console.log(error);
    }
  }

  async function signUp({
    cpf,
    nome,
    idade,
    numero_sus,
    endereco_id,
    sexo,
    foto_perfil,
    senha,
  }) {
    const data = new FormData();

    data.append("cpf", cpf);
    data.append("nome", nome);
    data.append("idade", idade);
    data.append("numero_sus", numero_sus);
    data.append("endereco_id", endereco_id);
    data.append("sexo", sexo);
    data.append("foto_perfil", foto_perfil);
    data.append("senha", senha);

    try {
      await api.post("/paciente", data);
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
      console.log(error);
    }
  }

  return (
    <AuthPacienteContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthPacienteContext.Provider>
  );
}
