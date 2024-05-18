"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useAuthService } from "../services/auth.service";
import ButtonComponent from "@/components/Button";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
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
          <ButtonComponent onClick={handleLogout}>
            Cerrar sesion
          </ButtonComponent>
        </>
      ) : (
        <>
          <p>No estás logueado</p>
          <ButtonComponent onClick={handleLoginRedirect}>
            Iniciar sesión
          </ButtonComponent>
        </>
      )}
    </div>
  );
}
