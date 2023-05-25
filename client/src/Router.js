import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cliente" element={<Cliente />} />
    </Routes>
  );
}
