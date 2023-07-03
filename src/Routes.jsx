import { BrowserRouter, Routes, Route } from "react-router-dom";

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

/* Pages Médicas */
import HomeDoctor from "./pages/Doctor/HomeDoctor";
import ProfileDoctor from "./pages/Doctor/ProfileDoctor";
import DoctorConsultation from "./pages/Doctor/DoctorConsultation";
import DoctorShifts from "./pages/Doctor/DoctorShifts";
import DoctorPrescriptions from "./pages/Doctor/DoctorPrescriptions";
import DoctorMedications from "./pages/Doctor/DoctorMedications";
import PatientStatus from "./pages/Doctor/PatientStatus";

/* Contexts */
import { DarkModeProvider } from "./context/DarkModeContext";

export default function AppRoutes() {
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
            <Route path="/userProfile" element={<Profile />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/shifts" element={<Shifts />} />

            {/* Rotas referente aos médicos*/}
            <Route path="/doctor" element={<HomeDoctor />} />
            <Route path="/profileDoctor" element={<ProfileDoctor />} />
            <Route
              path="/doctorConsultations"
              element={<DoctorConsultation />}
            />
            <Route path="/doctorShifts" element={<DoctorShifts />} />
            <Route path="/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="/doctorMedications" element={<DoctorMedications />} />
            <Route path="/patientStatus" element={<PatientStatus />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}
