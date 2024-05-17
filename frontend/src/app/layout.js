import "./globals.css";

import RootLayout from "../components/RootLayout";

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
