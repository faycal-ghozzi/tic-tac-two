"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    socket.on("game-created", (gameId: string) => {
      router.push(`/game/online/${gameId}`);
    });

    return () => {
      socket.off("game-created");
    };
  }, [router]);

  const createOnlineGame = () => {
    socket.emit("create-game");
  };

  return (
    <main className="flex flex-col flex-grow items-center justify-center px-4 text-black text-center">

      <h1 className="text-5xl font-bold mb-4 text-center text-gray-900">
        Tic Tac <span className="animate-aurora bg-clip-text text-transparent">TWO!</span>
      </h1>
      <p className="text-lg text-center text-gray-600 mt-2 max-w-md mx-auto">
        fewer moves, more strategy.
      </p>
      <br />
      <br />
      <br />
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link href="/game/local" className="menu-btn menu-btn-purple">
          Local Multiplayer
        </Link>

        <button
          onClick={createOnlineGame}
          className="menu-btn menu-btn-blue text-center"
        >
          Create Online Game
        </button>

        <Link href="/how-to-play" className="menu-btn menu-btn-green">
          How to Play
        </Link>
      </div>
    </main>
  );
}
