"use client";
import LoginForm from "../../components/loginForm";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const handleLogged = () => {
    router.push("/");
  };

  if (localStorage.getItem("user")) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={handleLogged}>Ir a home</button>
      </>
    );
  }

  return (
    <div>
      <h1>Inicia sesion!</h1>
      <LoginForm />
    </div>
  );
}
