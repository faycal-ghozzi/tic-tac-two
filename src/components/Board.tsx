"use client";

import { useState } from "react";
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
  const [fadingTurn, setFadingTurn] = useState<"X" | "O" | null>(null);
  const [animatedIndices, setAnimatedIndices] = useState<Set<number>>(new Set());
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
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
    let { board, turn, winner } = getCurrentState();
    let newBoard = [...board];

    // ✅ 1. Remove fading move if it's from the *opponent*
    if (fadingIndex !== null && fadingTurn !== turn) {
      newBoard[fadingIndex] = null;
      setFadingIndex(null);
      setFadingTurn(null);
    }

    // 🚫 Invalid move
    if (newBoard[index] !== null || winner) {
      setError("Invalid move!");
      setTimeout(() => setError(null), 1500);
      return;
    }

    // ✅ 2. Place the move
    newBoard[index] = turn;
    setAnimatedIndices(new Set([index]));

    // ✅ 3. Update move history & apply fading
    let newXHistory = [...xHistory];
    let newOHistory = [...oHistory];

    if (turn === "X") {
      newXHistory.push(index);
      if (newXHistory.length > 3) {
        newXHistory.shift(); // remove oldest
        setFadingIndex(newXHistory[0]);
        setFadingTurn("X");
      } else if (newXHistory.length === 3) {
        setFadingIndex(newXHistory[0]);
        setFadingTurn("X");
      } else {
        setFadingIndex(null);
        setFadingTurn(null);
      }
      setXHistory(newXHistory);
    } else {
      newOHistory.push(index);
      if (newOHistory.length > 3) {
        newOHistory.shift();
        setFadingIndex(newOHistory[0]);
        setFadingTurn("O");
      } else if (newOHistory.length === 3) {
        setFadingIndex(newOHistory[0]);
        setFadingTurn("O");
      } else {
        setFadingIndex(null);
        setFadingTurn(null);
      }
      setOHistory(newOHistory);
    }

    // ✅ 4. Check winner
    const result = checkWinner(newBoard);
    if (Array.isArray(result)) {
      setWinningLine(result);
      setFadingIndex(null);
      setFadingTurn(null);
    }

    // ✅ 5. Update game state
    if (isOnline && gameId) {
      try {
        const gameRef = doc(db, "games", gameId);
        await updateDoc(gameRef, {
          board: newBoard,
          turn: turn === "X" ? "playerO" : "playerX",
          winner: result ? turn : null,
        });
      } catch (err) {
        console.error("Error updating game:", err);
        setError("Move failed. Try again.");
      }
    } else {
      const updated = {
        board: newBoard,
        turn: turn === "X" ? "O" : "X",
        winner: result ? turn : null,
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
        winningLine={winningLine}
        animatedIndices={animatedIndices}
      />
    </div>
  );
}
