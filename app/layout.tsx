import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense workout library and daily training log.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="m-0 min-h-screen bg-[#0f1115] font-sans text-[#f1f2f4] antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
