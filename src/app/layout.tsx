"use client"
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en" className="h-full">
      <body className={`relative h-full bg-gray-100 ${pathname.startsWith("/game") ? "overflow-hidden" : "overflow-auto"}`}>
      <div id="particles-bg" className="absolute inset-0 -z-10 pointer-events-none"></div>
        <Analytics />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

