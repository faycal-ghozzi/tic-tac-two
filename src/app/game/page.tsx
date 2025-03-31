"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../utils/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default function GamePage() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [inputGameId, setInputGameId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
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

      await setDoc(gameRef, initialGame);
      setGameId(gameId);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const joinGame = async () => {
    try {
      const gameRef = doc(db, "games", inputGameId);
      const gameSnapshot = await getDoc(gameRef);

      if (gameSnapshot.exists()) {
        const gameData = gameSnapshot.data();

        if (!gameData.playerO) {
          await updateDoc(gameRef, { playerO: auth.currentUser?.uid });
          setGameId(inputGameId);
        } else {
          alert("Game is already full.");
        }
      } else {
        alert("Game not found.");
      }
    } catch (error) {
      console.error("Error joining game:", error);
    } finally {
      setShowModal(false);
      setInputGameId("");
    }
  };

  useEffect(() => {
    if (gameId) {
      console.log("Game ID created:", gameId);
    }
  }, [gameId]);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <button onClick={createGame} className="menu-btn menu-btn-blue">
        Create Game
      </button>

      <button onClick={() => setShowModal(true)} className="menu-btn menu-btn-green">
        Join Game
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-pop space-y-4">
            <h2 className="text-lg font-bold text-center">Enter Game ID</h2>
            <input
              type="text"
              value={inputGameId}
              onChange={(e) => setInputGameId(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded text-black dark:text-white bg-white dark:bg-gray-900"
              placeholder="Game ID"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="menu-btn menu-btn-purple"
              >
                Cancel
              </button>
              <button onClick={joinGame} className="menu-btn menu-btn-green">
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
