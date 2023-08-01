import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit'
import Login from './pages/Login';
import Home from './pages/Home';
import Cliente from './pages/Cliente';
import Treino from './pages/Treino';


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
      }/>

      <Route path="/cliente" element={
          <RequireAuth loginPath={'/login'}>
              <Cliente />
          </RequireAuth>
      }/>
      
      <Route path="/treino/:idStudent/:nameStudents" element={<Treino />} />
    </Routes>
  );
}