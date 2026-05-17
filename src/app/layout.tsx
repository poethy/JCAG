import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JCAG S.A.S — Infraestructura Eléctrica",
  description:
    "Empresa colombiana especializada en instalación y mantenimiento de infraestructura eléctrica para el sector energético.",
  keywords: ["infraestructura eléctrica", "subestaciones", "CHEC", "Colombia", "montaje electromecánico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
