"use client";
import LoginForm from "../../components/loginForm";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogged = () => {
    router.push("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Ya estás logeado!</h2>
          <button onClick={handleLogged}>Ir a home</button>
        </>
      ) : (
        <>
          <h1>Inicia sesión!</h1>
          <LoginForm />
        </>
      )}
    </div>
  );
}