"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import BoardCore from "./BoardCore";
import { checkWinner } from "../utils/checkWinner";
import { GameType } from "../types/GameType";

interface LocalGame {
  board: (string | null)[];
  turn: "X" | "O";
  winner: string | null;
}

interface BoardProps {
  isOnline: boolean;
  gameId?: string;
  game?: GameType;
  initialGameState?: LocalGame;
  onLocalStateChange?: (state: LocalGame) => void;
}

export default function Board({
  isOnline,
  game,
  initialGameState,
  onLocalStateChange,
}: BoardProps) {
  // Local game state
  const [localGame, setLocalGame] = useState<LocalGame>(
    initialGameState || {
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
  const [showModal, setShowModal] = useState(false);

  // Safety check for online mode
  if (isOnline && !game) {
    return <div>Loading game...</div>;
  }

  const board = isOnline ? game!.board : localGame.board;
  const turn = isOnline
    ? game!.turn === "playerX"
      ? "X"
      : "O"
    : localGame.turn;
  const winner = isOnline
    ? game!.winner
      ? game!.winner === "playerX"
        ? "X"
        : "O"
      : null
    : localGame.winner;

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isOnline) return; // Online is read-only here

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
      if (newXHistory.length > 2) {
        newXHistory.shift();
        setFadingIndex(newXHistory[0]);
        setFadingTurn("X");
      }
      setXHistory(newXHistory);
    } else {
      newOHistory.push(index);
      if (newOHistory.length > 2) {
        newOHistory.shift();
        setFadingIndex(newOHistory[0]);
        setFadingTurn("O");
      }
      setOHistory(newOHistory);
    }

    const result = checkWinner(newBoard);
    if (Array.isArray(result)) {
      const updatedState = {
        board: newBoard,
        turn,
        winner: turn as "X" | "O",
      };
      setLocalGame(updatedState);
      setWinningLine(result);
      setShowModal(true);
      setTimeout(() => confetti({ spread: 120, origin: { y: 0.5 } }), 200);
      onLocalStateChange?.(updatedState);
      return;
    }

    const updatedState = {
      board: newBoard,
      turn: (turn === "X" ? "O" : "X") as "X" | "O",
      winner: null,
    };
    setLocalGame(updatedState);
    onLocalStateChange?.(updatedState);
  };

  const restartGame = () => {
    const resetState: LocalGame = {
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    };
    setLocalGame(resetState);
    setXHistory([]);
    setOHistory([]);
    setFadingIndex(null);
    setFadingTurn(null);
    setWinningLine(null);
    setAnimatedIndices(new Set());
    setShowModal(false);
    onLocalStateChange?.(resetState);
  };

  return (
    <div className="flex flex-col items-center">
      {!isOnline && (
        <>
          <h1 className="text-2xl font-bold mb-2">Local PvP Game</h1>
          <p className="mb-4">Current Turn: {turn}</p>
        </>
      )}
      <BoardCore
        board={board}
        onCellClick={handleCellClick}
        winner={winner}
        fadingIndex={fadingIndex}
        winningLine={winningLine}
        animatedIndices={animatedIndices}
      />
      {!isOnline && winner && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">{winner} Wins!</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={restartGame}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Restart
              </button>
              <button
                onClick={() => (window.location.href = "/")}
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
