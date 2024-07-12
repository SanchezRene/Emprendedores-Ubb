import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import App from "./pages/App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Carrera from "./pages/CarreraPage.jsx";
import FormularioPage from "./pages/FormularioPage.jsx";

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
        element: <Carrera />,
      },
      {
        path: "/formulario-inscripcion",
        element: <FormularioPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
