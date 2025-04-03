"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white flex justify-between items-center px-4 py-2 shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/image.png"
          alt="Logo"
          width={24}
          height={24}
          className="rounded-md"
          priority
        />
        <span className="text-lg font-bold">Tic Tac TWO</span>
      </Link>
    </nav>
  );
}
