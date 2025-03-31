"use client";

// import { auth } from "../utils/firebase";
// import { signOut } from "firebase/auth";
import Link from "next/link";
// import { useState } from "react";

export default function Navbar() {
  // const [user, setUser] = useState(auth.currentUser);

  // auth.onAuthStateChanged((currentUser) => {
  //   setUser(currentUser);
  // });

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   setUser(null);
  // };

  return (
    <nav className="w-full bg-gray-800 text-white flex justify-between items-center px-4 py-2">
      <h1 className="text-lg font-bold">
        <Link href="/">Tic Tac Two</Link>
      </h1>
      <div className="flex space-x-4">
        {/* {!user ? (
            <>
            <Link
                href="/login"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            >
                Login
            </Link>
            <Link
                href="/signup"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
                Sign Up
            </Link>
            </>
        ) : (
            <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
            Logout
            </button>
        )} */}
        {/* <a
            href="https://www.paypal.com/donate?hosted_button_id=fgh19"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
        >
            Donate
        </a> */}
        </div>
    </nav>
  );
}
