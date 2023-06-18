import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Treino from "./pages/Treino";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/treino/:codigo/:nome" element={<Treino/>} />
    </Routes>
  );
}
