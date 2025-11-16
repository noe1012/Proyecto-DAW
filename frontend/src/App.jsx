import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Eventos from "./pages/Eventos.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Perfil from "./pages/Perfil.jsx";
import PanelNegocio from "./pages/PanelNegocio";
import ProtectedRoute from "./components/ProtectedRoute";
import EventDetail from "./pages/EventDetail.jsx";
import MisEventos from "./pages/MisEventos.jsx";

export default function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panel-negocio"
          element={
            <ProtectedRoute>
              <PanelNegocio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-eventos"
          element={
            <ProtectedRoute>
              <MisEventos />
            </ProtectedRoute>
          }
        />
        <Route path="/eventos/:id" element={<EventDetail />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
