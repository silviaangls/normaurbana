import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata = {
  title: "NormaUrb — Consultor de Normas de Diseño Urbano",
  description:
    "Consulta normas de diseño urbano para intervenciones en vía pública en la Ciudad de México. Integra RCDF, NOM-034, Manual de Calles, NACTO, ITDP, CROW y SEDATU.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
