"use client";

import { useRouter } from "next/navigation";

import { AuthProvider } from "../context/AuthContext";

function RootLayout({ children }) {
  return (
    <AuthProvider>
      <PageRoot>{children}</PageRoot>
    </AuthProvider>
  );
}

function PageRoot({ children }) {
  const router = useRouter();

  return <div>{children}</div>;
}

export default RootLayout;
