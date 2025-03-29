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
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Tic Tac Toe!</h1>
        <div className="space-y-4">
          <a href="/game/local" className="bg-purple-500 text-white px-4 py-2 rounded">
            Local Multiplayer
          </a>
          <a href="/game" className="bg-blue-500 text-white px-4 py-2 rounded">
            Play Game
          </a>
          <a href="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded">
            View Scoreboard
          </a>
        </div>
      </main>
    );
  }

  return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
}
