"use client";

import { useState } from "react";
import Board from "../../../components/Board";

export default function LocalGamePage() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    turn: "X" as "X" | "O",
    winner: null as string | null,
  });

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Board
        isOnline={false}
        initialGameState={gameState}
        onLocalStateChange={setGameState}
      />
      {gameState.winner && (
        <button
          onClick={resetGame}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Restart
        </button>
      )}
    </main>
  );
}
