import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Eventos from "./pages/Eventos.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Perfil from "./pages/Perfil.jsx";
import PanelNegocio from "./pages/PanelNegocio.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import EventDetail from "./pages/EventDetail.jsx";
import MisEventos from "./pages/MisEventos.jsx";
import Locales from "./pages/Locales.jsx";


function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/panel-negocio" element={<PanelNegocio />} />
        <Route path="/eventos/:id" element={<EventDetail />} />
        <Route path="/mis-eventos" element={<MisEventos />} />
        <Route path="/locales" element={<Locales />} />
        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
