import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
/* Components */
import Container from "./components/layout/Container";
import Error from "./components/layout/Error";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

/* Pages */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Patient/Home";
import Profile from "./pages/Patient/Profile";
import Medication from "./pages/Patient/Medication";
import Consultation from "./pages/Patient/Consultation";
import Tickets from "./pages/Patient/Tickets";
import Shifts from "./pages/Patient/Shifts";
import PatientRegister from "./pages/Patient/PatientRegister";
import PatientAddress from "./pages/Patient/PatientAddress";
import PatientLogin from "./pages/Patient/PatientLogin";
import ConsultaRegister from "./pages/Patient/ConsultaRegister";
import Consulta from "./pages/Patient/Consulta";

/* Pages Médicas */
import HomeDoctor from "./pages/Doctor/HomeDoctor";
import ProfileDoctor from "./pages/Doctor/ProfileDoctor";
import DoctorConsultation from "./pages/Doctor/DoctorConsultation";
import DoctorShifts from "./pages/Doctor/DoctorShifts";
import DoctorPrescriptions from "./pages/Doctor/DoctorPrescriptions";
import DoctorMedications from "./pages/Doctor/DoctorMedications";
import PatientStatus from "./pages/Doctor/PatientStatus";
import DoctorAddress from "./pages/Doctor/DoctorAdress";
import DoctorRegister from "./pages/Doctor/DoctorRegister";
import DoctorLogin from "./pages/Doctor/DoctorLogin";

/* Contexts */
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider, AuthPacienteContext } from "./context/AuthContext";
import { AuthMedProvider, AuthMedContext } from "./context/AuthMedContext";

export default function AppRoutes() {
  const { user, isAuthenticated } = useContext(AuthPacienteContext);
  const { userDoctor } = useContext(AuthMedContext);

  return (
    <DarkModeProvider>
          <BrowserRouter>
            <Navbar />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />

                {/* Rotas referente aos pacientes */}
                <Route path="/userProfile" element={ user? <Profile /> : <Error/>} />
                <Route path="/medication" element={<Medication />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/shifts" element={<Shifts />} />
                <Route
                  path="/register/paciente"
                  element={<PatientRegister />}
                />
                <Route
                  path="/register-endereco/paciente"
                  element={<PatientAddress />}
                />
                <Route path="/login/paciente" element={<PatientLogin />} />
                <Route path="/consulta/new" element={user ? <ConsultaRegister /> : <Error/>} />
                <Route path="/consulta/:id" element={<Consulta />} />

                {/* Rotas referente aos médicos*/}
                <Route path="/doctor" element={<HomeDoctor />} />
                <Route
                  path="/profileDoctor"
                  element={userDoctor ? <ProfileDoctor /> : <Error />}
                />
                <Route
                  path="/register-endereco/médico"
                  element={<DoctorAddress />}
                />
                <Route path="/register/médico" element={<DoctorRegister />} />
                <Route path="/login/médico" element={<DoctorLogin />} />
                <Route
                  path="/doctorConsultations"
                  element={userDoctor ? <DoctorConsultation /> : <Error />}
                />
                <Route
                  path="/doctorShifts"
                  element={userDoctor ? <DoctorShifts /> : <Error />}
                />
                <Route
                  path="/prescriptions"
                  element={userDoctor ? <DoctorPrescriptions /> : <Error />}
                />
                <Route
                  path="/doctorMedications"
                  element={userDoctor ? <DoctorMedications /> : <Error />}
                />
                <Route path="/patientStatus" element={<PatientStatus />} />
              </Routes>
            </Container>
            <Footer />
          </BrowserRouter>
    </DarkModeProvider>
  );
}
