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

  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [semiFadingIndex, setSemiFadingIndex] = useState<number | null>(null);
  const [pendingRemovalIndex, setPendingRemovalIndex] = useState<number | null>(null);
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
    // Always remove the faded cell if scheduled
    let { board, turn, winner } = getCurrentState();
    let newBoard = [...board];

    if (pendingRemovalIndex !== null) {
      newBoard[pendingRemovalIndex] = null;
      setPendingRemovalIndex(null);
    }

    // Prevent placing on non-null cells AFTER removing pending
    if (newBoard[index] !== null || winner) {
      setError("Invalid move!");
      setTimeout(() => setError(null), 1500);
      return;
    }

    // Reset fade states if reused
    if (fadingIndex === index) setFadingIndex(null);
    if (semiFadingIndex === index) setSemiFadingIndex(null);

    // Handle move
    let newXHistory = [...xHistory];
    let newOHistory = [...oHistory];
    let nextFading: number | null = null;
    let nextSemiFading: number | null = null;

    const updateHistory = (history: number[], set: (h: number[]) => void) => {
      history.push(index);
      if (history.length > 3) {
        nextFading = history.shift()!;
        nextSemiFading = history[0] ?? null;
      } else if (history.length === 3) {
        nextSemiFading = history[0];
        nextFading = null;
      } else {
        nextFading = null;
        nextSemiFading = null;
      }
      set(history);
    };

    if (turn === "X") {
      updateHistory(newXHistory, setXHistory);
    } else {
      updateHistory(newOHistory, setOHistory);
    }

    newBoard[index] = turn;
    const result = checkWinner(newBoard);

    // Update fade visuals
    setFadingIndex(nextFading);
    setSemiFadingIndex(nextSemiFading);

    // Only schedule removal if there's no winner
    if (!result && nextFading !== null) {
      setPendingRemovalIndex(nextFading);
    }

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
      const updated = {
        board: newBoard,
        turn: turn === "X" ? "O" : "X",
        winner: result ?? null,
      };
      setLocalState(updated);
      onLocalStateChange?.(updated);
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
        fadingIndex={fadingIndex}
        semiFadingIndex={semiFadingIndex}
      />
    </div>
  );
}
