import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JCAG S.A.S — Infraestructura Eléctrica",
  description:
    "Firma colombiana especializada en infraestructura eléctrica de alta tensión: subestaciones, redes, generación solar y obra civil asociada.",
  keywords: [
    "infraestructura eléctrica",
    "subestaciones",
    "CHEC",
    "Colombia",
    "montaje electromecánico",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
