"use client";

import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push("/game");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (user) {
    return (
      <main className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black">
        <div id="particles-bg" className="absolute inset-0 -z-10 pointer-events-none"></div>

        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">
          Welcome to Tic Tac <span className="text-indigo-600">TWO</span>!
        </h1>

        <div className="flex flex-col gap-6 w-[280px]">
          <a href="/game/local" className="menu-btn menu-btn-purple">
            Local Multiplayer
          </a>
          <a href="/game" className="menu-btn menu-btn-blue" style={{ pointerEvents: 'none', opacity: 0.5 }}>
            Play Game
          </a>
          {/* <a href="/scoreboard" className="menu-btn menu-btn-green">
            View Scoreboard
          </a> */}
        </div>

      </main>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
    </div>
  );
}
