import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Eventos from "./pages/Eventos";
import Perfil from "./pages/Perfil";
import PanelNegocio from "./pages/PanelNegocio";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/panel-negocio" element={<PanelNegocio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
