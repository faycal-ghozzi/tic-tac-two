"use client";

import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import BoardCore from "./BoardCore";
import { checkWinner } from "../utils/checkWinner";

interface OnlineGame {
  board: (string | null)[];
  turn: "playerX" | "playerO";
  playerX: string;
  playerO: string | null;
  winner: "playerX" | "playerO" | "Tie" | null;
}

interface LocalGame {
  board: (string | null)[];
  turn: "X" | "O";
  winner: string | null;
}

interface BoardProps {
  isOnline: boolean;
  gameId?: string;
  game?: OnlineGame;
  initialGameState?: LocalGame;
  onLocalStateChange?: (newState: LocalGame) => void;
}

type Symbol = "X" | "O";

export default function Board({
  isOnline,
  gameId,
  game,
  initialGameState,
  onLocalStateChange,
}: BoardProps) {
  const [localState, setLocalState] = useState<LocalGame>(
    initialGameState ?? {
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    }
  );

  // We track move history only for local mode — in real use, you'd track this online too if needed.
  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCurrentState = () => {
    return isOnline
      ? {
          board: game?.board ?? Array(9).fill(null),
          turn: game?.turn === "playerX" ? "X" : "O",
          winner:
            game?.winner === "playerX"
              ? "X"
              : game?.winner === "playerO"
              ? "O"
              : game?.winner ?? null,
        }
      : localState;
  };

  const handleCellClick = async (index: number) => {
    const { board, turn, winner } = getCurrentState();
    if (board[index] || winner) {
      setError("Invalid move!");
      setTimeout(() => setError(null), 1500);
      return;
    }

    let newBoard = [...board];
    let newXHistory = [...xHistory];
    let newOHistory = [...oHistory];

    if (turn === "X") {
      newXHistory.push(index);
      if (newXHistory.length > 3) {
        const oldestIndex = newXHistory.shift()!;
        newBoard[oldestIndex] = null;
      }
    } else {
      newOHistory.push(index);
      if (newOHistory.length > 3) {
        const oldestIndex = newOHistory.shift()!;
        newBoard[oldestIndex] = null;
      }
    }

    newBoard[index] = turn;
    const result = checkWinner(newBoard);

    if (isOnline && gameId) {
      try {
        const gameRef = doc(db, "games", gameId);
        await updateDoc(gameRef, {
          board: newBoard,
          turn: turn === "X" ? "playerO" : "playerX",
          winner: result ?? null,
        });
      } catch (err) {
        console.error("Error updating game:", err);
        setError("Move failed. Try again.");
      }
    } else {
      const updatedLocal = {
        board: newBoard,
        turn: (turn === "X" ? "O" : "X") as "X" | "O",
        winner: result ?? null,
      };
      setLocalState(updatedLocal);
      setXHistory(newXHistory);
      setOHistory(newOHistory);
      onLocalStateChange?.(updatedLocal);
    }
  };

  const { board, winner } = getCurrentState();

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <BoardCore
        board={board}
        onCellClick={handleCellClick}
        winner={winner}
      />
    </div>
  );
}
