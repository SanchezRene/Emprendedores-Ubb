"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useAuthService } from "../services/auth.service";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { logoutUser } = useAuthService();

  const handleLogout = () => {
    logoutUser();
  };

  const handleLoginRedirect = () => {
    router.push("/auth");
  };

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? (
        <>
          <p>Estas logeado como: {user?.email}</p>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </>
      ) : (
        <>
          <p>No estás logueado</p>
          <button onClick={handleLoginRedirect}>Iniciar sesión</button>
        </>
      )}
    </div>
  );
}
