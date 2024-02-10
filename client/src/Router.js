import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit'
import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Cliente from './pages/Cliente/index';
import Treino from './pages/Treino';
import Fichas from './pages/Fichas/index';


export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Private Routes */}
      <Route path="/home" element={
        <RequireAuth loginPath={'/login'}>
          <Home />
        </RequireAuth>
      } />

      <Route path="/fichas" element={
        <RequireAuth loginPath={'/login'}>
          <Fichas />
        </RequireAuth>
      } />

      <Route path="/cliente" element={
        <RequireAuth loginPath={'/login'}>
          <Cliente />
        </RequireAuth>
      } />

      <Route path="/treino/:idStudent/" element={
        <RequireAuth loginPath={'/login'}>
          <Treino />
        </RequireAuth>} />
    </Routes>
  );
}