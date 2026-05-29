import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Damir & Cagla's Massage-Praxis | Premium Massage in Garbsen",
  description: "Erleben Sie professionelle Triggerpunkt-, Schröpf- und Entspannungsmassagen in exklusiver, ruhiger Wohlfühlatmosphäre in Garbsen. Jetzt einfach online Wunschtermin buchen.",
  keywords: ["Massage Garbsen", "Triggerpunkt Massage", "Schröpfmassage", "Entspannungsmassage", "Wellness Garbsen", "Damir Krasnic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#12110F] text-[#F4F1EA] selection:bg-[#C5A880] selection:text-[#12110F]">
        {children}
      </body>
    </html>
  );
}
