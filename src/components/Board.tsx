"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import BoardCore from "./BoardCore";
import { checkWinner } from "../utils/checkWinner";

interface LocalGame {
  board: (string | null)[];
  turn: "X" | "O";
  winner: string | null;
}

export default function Board() {
  const [game, setGame] = useState<LocalGame>({
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
  });

  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [fadingTurn, setFadingTurn] = useState<"X" | "O" | null>(null);
  const [animatedIndices, setAnimatedIndices] = useState<Set<number>>(new Set());
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCellClick = (index: number) => {
    const { board, turn, winner } = game;
    if (board[index] || winner) return;

    const newBoard = [...board];

    if (fadingIndex !== null && fadingTurn !== turn) {
      newBoard[fadingIndex] = null;
      setFadingIndex(null);
      setFadingTurn(null);
    }

    newBoard[index] = turn;
    setAnimatedIndices(new Set([index]));

    const newXHistory = [...xHistory];
    const newOHistory = [...oHistory];

    if (turn === "X") {
      newXHistory.push(index);
      if (newXHistory.length > 3) {
        newXHistory.shift();
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

    const result = checkWinner(newBoard);
    if (Array.isArray(result)) {
      setGame({ board: newBoard, turn, winner: turn });
      setWinningLine(result);
      setShowModal(true);
      setTimeout(() => confetti({ spread: 120, origin: { y: 0.5 } }), 200);
      return;
    }

    setGame({
      board: newBoard,
      turn: turn === "X" ? "O" : "X",
      winner: null,
    });
  };

  const restartGame = () => {
    setGame({ board: Array(9).fill(null), turn: "X", winner: null });
    setXHistory([]);
    setOHistory([]);
    setFadingIndex(null);
    setFadingTurn(null);
    setWinningLine(null);
    setAnimatedIndices(new Set());
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Local PvP Game</h1>
      <p className="mb-4">Current Turn: {game.turn}</p>
      <BoardCore
        board={game.board}
        onCellClick={handleCellClick}
        winner={game.winner}
        fadingIndex={fadingIndex}
        winningLine={winningLine}
        animatedIndices={animatedIndices}
      />
      {showModal && game.winner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">{game.winner} Wins!</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={restartGame}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Restart
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
