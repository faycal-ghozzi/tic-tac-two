"use client"
import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <div id="particles-bg" className="absolute inset-0 -z-10 pointer-events-none"></div>
          <Analytics />
          <Navbar />
          <main className="flex flex-col flex-grow relative z-10items-center justify-center px-4 text-black text-center">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}

