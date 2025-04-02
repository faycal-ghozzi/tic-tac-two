"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import BoardCore from "./BoardCore";
import { GameType } from "../types/GameType";
import { handleMove } from "../utils/gameLogic";
import Image from "next/image";

interface LocalGame {
  board: (string | null)[];
  turn: "X" | "O";
  winner: string | null;
}

interface BoardProps {
  isOnline: boolean;
  gameId?: string;
  game?: GameType;
  playerSymbol?: "X" | "O";
  onMove?: (index: number) => void;
  onVoteRestart?: () => void;
  initialGameState?: LocalGame;
  onLocalStateChange?: (state: LocalGame) => void;
}

export default function Board({
  isOnline,
  game,
  gameId,
  playerSymbol,
  onMove,
  onVoteRestart,
  initialGameState,
  onLocalStateChange,
}: BoardProps) {
  const bongSound = typeof Audio !== "undefined" ? new Audio("/sfx/bong.mp3") : null;
  if (bongSound) bongSound.volume = 1.0;

  const [localGame, setLocalGame] = useState<LocalGame>(
    initialGameState || {
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    }
  );

  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);
  const [localFadingIndex, setLocalFadingIndex] = useState<number | null>(null);
  const [localFadingTurn, setLocalFadingTurn] = useState<"X" | "O" | null>(null);
  const [localAnimatedIndices, setLocalAnimatedIndices] = useState<Set<number>>(new Set());
  const [localWinningLine, setLocalWinningLine] = useState<number[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isWaiting = isOnline && (!game || !playerSymbol);

  if (isWaiting) {
    return <div>Waiting for opponent...</div>;
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

    const fadingIndex = isOnline ? game?.fadingIndex ?? null : localFadingIndex;
    const winningLine = isOnline ? game?.winningLine ?? null : localWinningLine;
    const animatedIndices = isOnline
      ? new Set<number>(game?.animatedIndices ?? [])
      : localAnimatedIndices;
    

  const handleCellClick = (index: number) => {
    const cellFilled = board[index] !== null;
    if (winner) return;

    if (cellFilled) {
      // play sfx and shake
      if (bongSound) bongSound.play();
      const el = document.getElementById(`cell-${index}`);
      if (el) {
        el.classList.add("animate-shake");
        setTimeout(() => el.classList.remove("animate-shake"), 400);
      }
      return;
    }

    if (isOnline) {
      if (cellFilled || playerSymbol !== turn) return;
      onMove?.(index);
      return;
    }

    const result = handleMove(index, {
      board,
      turn,
      winner,
      xHistory,
      oHistory,
      fadingIndex: localFadingIndex,
      fadingTurn: localFadingTurn,
    });

    if (!result) return;

    const { newState, winningLine, animatedIndices } = result;

    setLocalGame({
      board: newState.board,
      turn: newState.turn,
      winner: newState.winner,
    });

    setXHistory(newState.xHistory);
    setOHistory(newState.oHistory);
    setLocalFadingIndex(newState.fadingIndex);
    setLocalFadingTurn(newState.fadingTurn);
    setLocalWinningLine(winningLine);
    setLocalAnimatedIndices(animatedIndices);

    if (newState.winner) {
      setTimeout(() => confetti({ spread: 120, origin: { y: 0.5 } }), 200);
      setTimeout(() => {
        setShowModal(true);
        onLocalStateChange?.(newState);
      }, 1600);
    } else {
      onLocalStateChange?.(newState);
    }
  };

  const restartGame = () => {
    if (isOnline) {
      onVoteRestart?.();
      return;
    }

    const resetState: LocalGame = {
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    };

    setLocalGame(resetState);
    setXHistory([]);
    setOHistory([]);
    setLocalFadingIndex(null);
    setLocalFadingTurn(null);
    setLocalWinningLine(null);
    setLocalAnimatedIndices(new Set());
    setShowModal(false);
    onLocalStateChange?.(resetState);
  };

  useEffect(() => {
    if (!isOnline || !game) return;
    if (game.winner && !showModal) {
      setTimeout(() => confetti({ spread: 120, origin: { y: 0.5 } }), 200);
      setTimeout(() => setShowModal(true), 1600);
    }
  }, [game, showModal, isOnline]);

  useEffect(() => {
    if (isOnline && game && !game.winner) {
      setShowModal(false);
    }
  }, [game, isOnline]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="text-center mb-6">
        {isOnline && game && (
          <div className="w-full max-w-2xl mb-6 flex justify-center gap-4">
            {["X", "O"].map((symbol) => {
              const playerId = symbol === "X" ? game.playerX : game.playerO;
              const isYou = playerId === playerSymbol;

              return (
                <div
                  key={symbol}
                  className="flex flex-col items-center justify-between px-4 py-3 w-40 bg-white rounded shadow"
                >
                  <Image
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${playerId}`}
                    alt="avatar"
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <p className={`text-sm font-extrabold ${symbol === "X" ? "text-[#EF476F]" : "text-[#06D6A0]"}`}>
                    {symbol} {isYou ? "(You)" : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    Score: {game.players?.find(p => p.id === playerId)?.score ?? 0}
                  </p>
                  <div className="mt-1 text-xl">
                    {game.players?.find(p => p.id === playerId)?.readyToRestart ? (
                      <span className={`text-3xl font-extrabold ${symbol === "X" ? "text-[#EF476F]" : "text-[#06D6A0]"}`}>
                        {symbol}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Waiting...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <br />
        <br />
        <h1 className="text-4xl font-bold text-gray-800">
          Current Turn:
          <span className={`ml-2 ${turn === "X" ? "text-[#EF476F]" : "text-[#06D6A0]"}`}>
            {turn}
          </span>
        </h1>
      </div>

      <BoardCore
        board={board}
        onCellClick={handleCellClick}
        winner={winner}
        fadingIndex={fadingIndex}
        winningLine={winningLine}
        animatedIndices={animatedIndices}
      />

      {isOnline && gameId && (
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">Invite a friend:</p>
          <div className="flex justify-center gap-2 items-center">
            <input
              type="text"
              readOnly
              value={typeof window !== "undefined" ? `${window.location.origin}/game/online/${gameId}` : ""}
              className="border px-2 py-1 rounded w-60 text-sm"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/game/online/${gameId}`);
              }}
            >
              Copy
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <Image
              alt="QR Code"
              className="w-24 h-24"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`${window.location.origin}/game/online/${gameId}`)}`}
            />
          </div>
        </div>
      )}


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-center p-8 rounded-lg shadow-lg animate-pop">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              🎉 {winner} Wins!
            </h2>
            <div className="flex justify-center gap-4 mt-4">
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
