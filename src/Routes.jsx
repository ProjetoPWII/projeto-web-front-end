import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Container from "./components/layout/Container";
import Error from "./components/layout/Error";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

/* Contexts */
import { DarkModeProvider } from "./context/DarkModeContext";

export default function AppRoutes() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}
