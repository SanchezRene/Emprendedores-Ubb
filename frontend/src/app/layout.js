import { Inter } from "next/font/google";
import "./globals.css";

import RootLayout from "../components/RootLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Emprendedores UBB",
  description: "Sitio web de Emprendedores UBB",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
