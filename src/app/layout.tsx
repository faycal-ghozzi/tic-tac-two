import Navbar from "../components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Analytics />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
