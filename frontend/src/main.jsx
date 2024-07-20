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
import ManualInscriptionPage from "./pages/ManualInscriptionPage.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

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
        path: "/gestion-usuarios",
        element: <UserPage />,
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
        path: "/gestion-actividades",
        element: (
          <PrivateRoute allowedRoles={['encargado', 'admin']}>
            <ActivityManagementPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/inscripcion-manual",
        element: (
          <PrivateRoute allowedRoles={['encargado', 'admin']}>
            <ManualInscriptionPage />
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
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
