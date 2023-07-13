import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthMedContext } from "../../context/AuthMedContext";
import { useNavigate } from "react-router-dom";
import { setupAPIClient } from "../../api/api";

function ProfileDoctor() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { userDoctor } = useContext(AuthMedContext);
  const [consultas, setConsultas] = useState([]);

  const containerClassName = isDarkMode ? "dark-container" : "";
  const apiClient = setupAPIClient();

  const navigate = useNavigate();

  useEffect(() => {
    async function getConsultas() {
      if (userDoctor) {
        const resp = await apiClient.get(`/consultas/medico/${userDoctor.crm}`);
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i]["data_plantao"] = new Date(resp.data[i]["data_plantao"]);
          const day = resp.data[i]["data_plantao"].getDay();
          const month = resp.data[i]["data_plantao"].getMonth();
          if (day < new Date().getDate() && month < new Date().getMonth()) {
            resp.data[i]["status"] = "Realizada";
          }
          //setPlantoes([...plantoes, resp.data[i]])
        }
        setConsultas(resp.data);
      }
    }

    getConsultas();
  }, []);

  const getConsulta = async function (consulta_id) {
    navigate(`/doctorConsultations/${consulta_id}`);
  };

  console.log(userDoctor)

  // const defaultProfile = "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"

  return (
    <div className={`${containerClassName}`}>
      {userDoctor ? (
        <>
          <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-9 col-xl-7">
                  <div className="card">
                    <div
                      className="rounded-top  d-flex flex-row"
                      style={{ backgroundColor: "#000;", height: "200px;" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={`${userDoctor.foto_perfil}`}
                          alt="Generic placeholder image"
                          className="img-fluid img-thumbnail mt-4 mb-2"
                          style={{ width: "150px;", zIndex: 1 }}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          data-mdb-ripple-color="dark"
                          style={{ zIndex: 1 }}
                        >
                          Editar perfil
                        </button>
                      </div>
                      {/* <div className="ms-3" style={{ marginTop: "130px;" }}>
                        <h5>Andy Horwitz</h5>
                        <p>New York</p>
                      </div> */}
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa;" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <p className="mb-1 h5">Nome</p>
                          <p className="small text-muted mb-0">
                            {userDoctor.nome}
                          </p>
                        </div>
                        <div className="px-3">
                          <p className="mb-1 h5">Sexo</p>
                          <p className="small text-muted mb-0">
                            {userDoctor.sexo}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 h5">Idade</p>
                          <p className="small text-muted mb-0">
                            {userDoctor.idade}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">Informações</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa;" }}
                        >
                          <p className="font-italic mb-1">
                            <b>Cidade</b>:{userDoctor.endereco.cidade}
                          </p>
                          <p className="font-italic mb-1">
                            <b>Estado</b>: {userDoctor.endereco.estado}
                          </p>
                          <p className="font-italic mb-0">
                            <b>Bairro</b>:{userDoctor.endereco.bairro}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Consultas</p>
                        {/* <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p> */}
                      </div>

                      <div className="d-flex flex-wrap justify-content-center">
                        {userDoctor &&
                          consultas.map((consulta) => (
                            <div
                              onClick={() => getConsulta(consulta["id"])}
                              key={consulta["data_plantao"]}
                              className="card m-2 bg-dark text-white"
                              style={{
                                width: "16rem",
                                boxShadow:
                                  "13px 16px 14px 0px rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                className="card-img-top"
                                src="https://assets-global.website-files.com/5d3ac7a15216e366e6929e20/623c5e44f4cf108ae645f218_male%20medic%20AandE%20-01.png"
                                alt="Card image cap"
                              />
                              <div className="card-body">
                                <h5 className="card-title">{`Consulta dia ${consulta[
                                  "data_plantao"
                                ].getDate()} do ${
                                  consulta["data_plantao"].getMonth() + 1
                                }`}</h5>
                                <p
                                  style={{ fontSize: "1.1rem" }}
                                  className="card-text text-info"
                                >
                                  <b>Médico CRM</b>
                                  {`:${consulta["medico_crm"]}`}
                                </p>
                                <p
                                  style={{ fontSize: "1.1rem" }}
                                  className="card-text"
                                >
                                  <b>Status</b>
                                  {`:${consulta["status"]}`}
                                </p>
                                {/* <button onClick={() => handleConsulta(plantao['data'], plantao['medico_crm'])} href="#" className="btn btn-primary">Agendar</button> */}
                              </div>
                            </div>
                          ))}

                        {!consultas.length > 0 && <p>Sem consultas</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        "Carregando perfil do médico..."
      )}
    </div>
  );
}

export default ProfileDoctor;
