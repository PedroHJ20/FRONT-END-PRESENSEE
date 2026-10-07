import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Welcome from "./pages/Welcome"
import CadastroEscola from "./pages/CadastroEscola"
import Dashboard from "./pages/Dashboard"
import Alunos from "./pages/Alunos"
import Alertas from "./pages/Alertas"
import Frequencia from "./pages/Frequencia"
import Relatorios from "./pages/Relatorios"
import Turmas from "./pages/Turmas"
import NovoAluno from "./pages/NovoAluno"
import Diario from "./pages/Diario"
import AlunoPerfil from "./pages/AlunoPerfil"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>

     <Routes>

  <Route
  path="/"
  element={<Welcome />}
/>

<Route
  path="/interno/nova-escola"
  element={<CadastroEscola />}
/>

  <Route
    path="/login"
    element={<Login />}
  />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alunos"
          element={
            <ProtectedRoute>
              <Alunos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/novo-aluno"
          element={
            <ProtectedRoute>
              <NovoAluno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turmas"
          element={
            <ProtectedRoute>
              <Turmas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frequencia"
          element={
            <ProtectedRoute>
              <Frequencia />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alertas"
          element={
            <ProtectedRoute>
              <Alertas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorios"
          element={
            <ProtectedRoute>
              <Relatorios />
            </ProtectedRoute>
          }
        />


      <Route
          path="/diario"
          element={
            <ProtectedRoute>
              <Diario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diario/aluno/:id"
          element={
            <ProtectedRoute>
              <AlunoPerfil />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>
  )
}

export default App