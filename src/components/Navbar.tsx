"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white flex justify-between items-center px-4 py-2 shadow-md">
      <h1 className="text-lg font-bold">
        <Link href="/">Tic Tac Two</Link>
      </h1>
    </nav>
  );
}
