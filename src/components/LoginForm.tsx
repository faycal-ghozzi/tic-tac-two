import { useState } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isSignup ? "Sign Up" : "Login"}
      </button>
      <button
        type="button"
        onClick={() => setIsSignup(!isSignup)}
        className="text-sm text-gray-500"
      >
        {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </form>
  );
}
