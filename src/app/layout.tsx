export const metadata = {
  title: {
    default: "Tic Tac TWO!",
    template: "%s | Tic Tac TWO!",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  description: "A reimagined strategy-based Tic Tac Toe with fading mechanics. Play online or locally!",
  keywords: ["tic tac toe", "browser game", "mobile game", "indie game", "multiplayer", "multiplayer tic tac toe", "strategy", "online game", "minimalist board game"],
  authors: [{ name: "Faycal Ghozzi", url: "https://github.com/faycal-ghozzi" }],
  creator: "Faycal Ghozzi",
  openGraph: {
    title: "Tic Tac TWO!",
    description: "Fewer moves. More strategy. Online or local multiplayer Tic Tac Toe reimagined.",
    url: "https://tic-tac-two-phi.vercel.app",
    siteName: "Tic Tac TWO!",
    images: [
      {
        url: "https://tic-tac-two-phi.vercel.app/image-seo.png",
        width: 1024,
        height: 1024,
        alt: "Tic Tac TWO!",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Tic Tac TWO!",
  //   description: "A strategic twist on a classic game.",
  //   creator: "@fgh",
  //   images: ["https://tic-tac-two-phi.vercel.app/image.png"],
  // },
}

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

