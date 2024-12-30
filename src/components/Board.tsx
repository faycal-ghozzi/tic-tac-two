"use client";

import { useState } from "react";
import { getAIMove } from "../utils/ai";
import { checkWinner } from "../utils/checkWinner";
import { auth } from "../utils/firebase";
import { updateUserScore } from "../utils/firestore";

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const playerSymbol = isXNext ? "X" : "O";

    newBoard[index] = playerSymbol;
    if (isXNext) {
      const newXMoves = [...xMoves, index];
      if (newXMoves.length > 3) {
        const oldestMove = newXMoves.shift();
        if (oldestMove !== undefined) newBoard[oldestMove] = null;
      }
      setXMoves(newXMoves);
    } else {
      const newOMoves = [...oMoves, index];
      if (newOMoves.length > 3) {
        const oldestMove = newOMoves.shift();
        if (oldestMove !== undefined) newBoard[oldestMove] = null;
      }
      setOMoves(newOMoves);
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      const userId = auth.currentUser?.uid;
        if (userId) {
          if (result === "X" || result === "O") {
            const isWin = (result === "X" && isXNext) || (result === "O" && !isXNext);
            updateUserScore(userId, isWin ? "win" : "loss");
          } else if (result === "Tie") {
            updateUserScore(userId, "tie");
          }
        }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setXMoves([]);
    setOMoves([]);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 w-48 mb-4">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mb-4">
          {winner === "Tie" ? (
            <h2 className="text-lg font-bold">It's a Tie!</h2>
          ) : (
            <h2 className="text-lg font-bold">{winner} Wins!</h2>
          )}
        </div>
      )}
      <button
        onClick={resetGame}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reset Game
      </button>
    </div>
  );
}
