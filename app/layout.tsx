import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Patrona - Licorería",
  description: "Catálogo oficial programado por JAM",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}