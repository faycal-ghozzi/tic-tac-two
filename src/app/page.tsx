"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 text-black">  
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">
        Welcome to Tic Tac{" "}
        <span className="animate-aurora bg-clip-text text-transparent">TWO!</span>
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link href="/game/local" className="menu-btn menu-btn-purple">
          Local Multiplayer
        </Link>

        <Link
          href="#"
          className="menu-btn menu-btn-blue relative group cursor-not-allowed opacity-50 text-center"
        >
          <span className="block group-hover:opacity-0 transition-opacity duration-200">
            Create Online Game
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Coming Soon
          </span>
        </Link>

        <Link href="/how-to-play" className="menu-btn menu-btn-green">
          How to Play
        </Link>
      </div>
    </main>
  );
}
