"use client";

import { useRouter } from "next/navigation";

import { AuthProvider } from "../context/AuthContext";
import { Providers } from "../context/Providers";

function RootLayout({ children }) {
  return (
    <Providers>
      <AuthProvider>
        <PageRoot>{children}</PageRoot>
      </AuthProvider>
    </Providers>
  );
}

function PageRoot({ children }) {
  const router = useRouter();

  return <div>{children}</div>;
}

export default RootLayout;
