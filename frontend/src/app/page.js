"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.service";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div>
      <h1>Aqui deberia ir un header</h1>
      <p>Estas logeado como: {user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </div>
  );
}
