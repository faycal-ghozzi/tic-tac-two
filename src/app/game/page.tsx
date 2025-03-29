"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../utils/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default function GamePage() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [game, setGame] = useState<any>(null);
  const router = useRouter();

  const createGame = async () => {
    try {
      const gameId = Date.now().toString();
      const gameRef = doc(db, "games", gameId);
  
      const initialGame = {
        playerX: auth.currentUser?.uid,
        playerO: null,
        board: Array(9).fill(null),
        turn: "playerX",
        status: "ongoing",
        winner: null,
      };
  
      console.log("Creating game with data:", initialGame);
  
      await setDoc(gameRef, initialGame);
  
      console.log("Game created successfully with ID:", gameId);
      setGameId(gameId);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };
  

  const joinGame = async (gameId: string) => {
    try {
      const gameRef = doc(db, "games", gameId);
      const gameSnapshot = await getDoc(gameRef);
  
      if (gameSnapshot.exists()) {
        const gameData = gameSnapshot.data();
  
        if (!gameData.playerO) {
          await updateDoc(gameRef, { playerO: auth.currentUser?.uid });
          console.log("Joined game successfully as Player O");
          setGameId(gameId);
        } else {
          console.error("Game is already full.");
          alert("Game is already full.");
        }
      } else {
        console.error("Game not found.");
        alert("Game not found.");
      }
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  useEffect(() => {
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  }, [gameId, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {!gameId ? (
        <div className="space-y-4">
          <button
            onClick={createGame}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Game
          </button>
          <input
            type="text"
            placeholder="Enter Game ID"
            onChange={(e) => setGameId(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={() => joinGame(gameId as string)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Join Game
          </button>
        </div>
      ) : (
        <div>Redirecting...</div> 
      )}
    </main>
  );
}
