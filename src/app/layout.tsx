import type { Metadata } from "next";
import { Playfair_Display, Lato, Special_Elite } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Torigo | Master Guitar Craftsman",
    template: "%s | Torigo",
  },
  description:
    "Professional guitar repair, setup & restoration in Hanoi. Over 20 years of expertise.",
  keywords: ["guitar repair", "guitar setup", "sửa đàn guitar", "bảo dưỡng guitar", "Hà Nội"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${playfair.variable} ${lato.variable} ${specialElite.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
