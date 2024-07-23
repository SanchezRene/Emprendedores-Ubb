// src/main.jsx
import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import App from "./pages/App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CarreraPage from "./pages/CarreraPage.jsx";
import FormularioPage from "./pages/FormularioPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import EmprendedoresPage from "./pages/EmprendedoresPage.jsx";
import ActivityListPage from "./pages/ActivityListPage.jsx";
import ActivityManagementPage from "./pages/ActivityManagementPage.jsx";
import EstadoInscripcionPage from "./pages/EstadoInscripcionPage.jsx";
import AprobarRechazarInscripcion from "./pages/AprobarRechazarInscripcionPage.jsx";
import InscripcionManual from "./pages/InscripcionManualPage.jsx";

import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/carreras",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <CarreraPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/formulario-inscripcion",
        element: (
          <PrivateRoute allowedRoles={["admin","user", "emprendedor"]}>
            <FormularioPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/estado-inscripcion",
        element: (
          <PrivateRoute allowedRoles={["admin","user", "emprendedor"]}>
            <EstadoInscripcionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/gestion-usuarios",
        element: (
          <PrivateRoute allowedRoles={["admin", "encargado"]}>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/aprobar-rechazar-inscripcion",
        element: (
          <PrivateRoute allowedRoles={["admin","encargado"]}>
            <AprobarRechazarInscripcion />
          </PrivateRoute>
        ),
      },
      {
        path: "/emprendedores-inscritos",
        element: (
          <PrivateRoute allowedRoles={["admin","encargado"]}>
            <EmprendedoresPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/actividades",
        element: (
          <PrivateRoute allowedRoles={["admin","encargado"]}>
            <ActivityListPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/inscripcion-manual",
        element: (
          <PrivateRoute allowedRoles={["admin","encargado"]}>
            <InscripcionManual />
          </PrivateRoute>
        ),
      },
      {
        path: "/gestion-actividades",
        element: (
          <PrivateRoute allowedRoles={["admin", "encargado", "admin"]}>
            <ActivityManagementPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
