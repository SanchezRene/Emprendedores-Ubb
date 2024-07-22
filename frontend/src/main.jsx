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

import PrivateRoute from "./routes/PrivateRoute";

import EstadoInscripcionPage from "./pages/EstadoInscripcionPage.jsx";
import AprobarRechazarInscripcion from "./pages/AprobarRechazarInscripcionPage.jsx";
import InscripcionManual from "./pages/InscripcionManualPage.jsx";

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
        element: <CarreraPage />,
      },
      {
        path: "/formulario-inscripcion",
        element: <FormularioPage />,
      },
      {
        path: "/estado-inscripcion",
        element: <EstadoInscripcionPage />,
      },
      {
        path: "/gestion-usuarios",
        element: <UserPage />,
      },
      {
        path: "/aprobar-rechazar-inscripcion",
        element: <AprobarRechazarInscripcion />,
      },
      {
        path: "/emprendedores-inscritos",
        element: <EmprendedoresPage />,
      },
      {
        path: "/actividades",
        element: <ActivityListPage />,
      },
      {
        path: "/inscripcion-manual",
        element: <InscripcionManual />,
      },
      {
        path: "/gestion-actividades",
        element: (
          <PrivateRoute allowedRoles={["encargado", "admin"]}>
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
