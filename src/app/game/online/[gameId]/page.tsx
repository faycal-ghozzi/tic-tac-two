"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import socket from "@/lib/socket";
import Board from "@/components/Board";
import { GameType } from "@/types/GameType";
import { SocketGameData } from "@/types/SocketGame";

export default function OnlineGamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState<GameType | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);

  useEffect(() => {
    if (!gameId) return;

    socket.on("joined-successfully", ({ game, yourSymbol }: { game: SocketGameData, yourSymbol: "X" | "O" }) => {
      setPlayerSymbol(yourSymbol);
      setGame(convertSocketToGameType(game));
    });

    socket.on("game-start", (gameData: SocketGameData) => {
      setGame(convertSocketToGameType(gameData));
    });

    socket.on("game-updated", (gameData: SocketGameData) => {
      setGame(convertSocketToGameType(gameData));
    });

    socket.on("game-restarted", (gameData: SocketGameData) => {
      setGame(convertSocketToGameType(gameData));
    });

    socket.on("game-ended", () => {
      alert("Your opponent left the game.");
      window.location.href = "/";
    });

    if (socket.connected) {
      socket.emit("join-game", gameId);
    } else {
      socket.on("connect", () => {
        socket.emit("join-game", gameId);
      });
    }

    return () => {
      socket.off("joined-successfully");
      socket.off("game-start");
      socket.off("game-updated");
      socket.off("game-restarted");
      socket.off("game-ended");
      socket.off("connect");
    };
  }, [gameId]);

  const handleMove = (index: number) => {
    if (!gameId) return;
    socket.emit("make-move", { gameId, index });
  };

  const handleRestartVote = () => {
    if (!gameId) return;
    socket.emit("vote-restart", gameId);
  };

  if (!game || !playerSymbol) return <div className="text-center mt-12">Waiting for opponent to join...</div>;

  return (
    <Board
      isOnline={true}
      gameId={gameId as string}
      game={game}
      playerSymbol={playerSymbol}
      onMove={handleMove}
      onVoteRestart={handleRestartVote}
    />
  );
}

function convertSocketToGameType(game: SocketGameData): GameType {
  const playerX = game.players.find(p => p.symbol === "X")?.id || "";
  const playerO = game.players.find(p => p.symbol === "O")?.id || "";

  return {
    playerX,
    playerO,
    board: game.board,
    turn: game.turn === "X" ? "playerX" : "playerO",
    winner: game.winner ? (game.winner === "X" ? "playerX" : "playerO") : null,
    status: game.winner ? "finished" : "ongoing",
  };
}
