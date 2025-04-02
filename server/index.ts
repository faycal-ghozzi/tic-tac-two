import express from "express";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { handleMove, GameState } from "./utils/gameLogic";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type PlayerSymbol = "X" | "O";

type Player = {
  id: string;
  symbol: PlayerSymbol;
  score: number;
  readyToRestart: boolean;
};

type Game = {
    id: string;
    players: Player[];
    board: (string | null)[];
    turn: PlayerSymbol;
    winner: PlayerSymbol | null;
    xHistory?: number[];
    oHistory?: number[];
    fadingIndex?: number | null;
    fadingTurn?: "X" | "O" | null;
    winningLine?: number[] | null;
};

const games: Record<string, Game> = {};

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("create-game", () => {
    const gameId = uuidv4().slice(0, 6);
    const player: Player = {
      id: socket.id,
      symbol: "X",
      score: 0,
      readyToRestart: false,
    };

    const game: Game = {
      id: gameId,
      players: [player],
      board: Array(9).fill(null),
      turn: "X",
      winner: null,
    };

    games[gameId] = game;
    socket.join(gameId);

    socket.emit("game-created", gameId);
    socket.emit("joined-successfully", {
      game,
      yourSymbol: player.symbol,
    });

    console.log(`[${gameId}] Game created by ${socket.id} as X`);
  });

  socket.on("join-game", (gameId: string) => {
    const game = games[gameId];
  
    if (!game) {
      socket.emit("error", "Game not found.");
      return;
    }
  
    const alreadyJoined = game.players.some(p => p.id === socket.id);
    if (alreadyJoined) {
      const player = game.players.find(p => p.id === socket.id)!;
      socket.emit("joined-successfully", {
        game,
        yourSymbol: player.symbol,
      });
      return;
    }
  
    if (game.players.length >= 2) {
      socket.emit("error", "Game is full.");
      return;
    }
  
    const player: Player = {
      id: socket.id,
      symbol: "O",
      score: 0,
      readyToRestart: false,
    };
  
    game.players.push(player);
    socket.join(gameId);
  
    socket.emit("joined-successfully", {
      game,
      yourSymbol: player.symbol,
    });
  
    io.to(gameId).emit("game-start", game);
  
    console.log(`[${gameId}] ${socket.id} joined as O`);
  });
  

  socket.on("make-move", ({ gameId, index }) => {
    const game = games[gameId];
    if (!game) return;
  
    const player = game.players.find(p => p.id === socket.id);
    if (!player || game.winner || game.board[index]) return;
  
    const prevState: GameState = {
      board: game.board,
      turn: game.turn,
      winner: game.winner,
      xHistory: game.xHistory || [],
      oHistory: game.oHistory || [],
      fadingIndex: game.fadingIndex ?? null,
      fadingTurn: game.fadingTurn ?? null,
    };
  
    const result = handleMove(index, prevState);
    if (!result) return;
  
    const { newState, winningLine } = result;
    game.board = newState.board;
    game.turn = newState.turn;
    game.winner = newState.winner as PlayerSymbol | null;
    game.xHistory = newState.xHistory;
    game.oHistory = newState.oHistory;
    game.fadingIndex = newState.fadingIndex;
    game.fadingTurn = newState.fadingTurn;
    game.winningLine = winningLine ?? null;
  
    const playerWhoMoved = game.players.find(p => p.symbol === player.symbol);
    if (game.winner && playerWhoMoved) {
      playerWhoMoved.score++;
    }
  
    io.to(gameId).emit("game-updated", {
      ...game,
      animatedIndices: Array.from(result.animatedIndices),
    });
  });

  socket.on("vote-restart", (gameId: string) => {
    const game = games[gameId];
    if (!game) return;
  
    const player = game.players.find(p => p.id === socket.id);
    if (player) player.readyToRestart = true;
  
    if (game.players.every(p => p.readyToRestart)) {
      game.board = Array(9).fill(null);
      game.winner = null;
      game.turn = game.turn === "X" ? "O" : "X";
  
      game.xHistory = [];
      game.oHistory = [];
      game.fadingIndex = null;
      game.fadingTurn = null;
      game.winningLine = null;
  
      game.players.forEach(p => {
        p.symbol = p.symbol === "X" ? "O" : "X";
        p.readyToRestart = false;
      });
  
      io.to(gameId).emit("game-restarted", game);
      console.log(`[${gameId}] Game restarted. Symbols swapped.`);
    }
  });
  

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    for (const [id, game] of Object.entries(games)) {
      if (game.players.some(p => p.id === socket.id)) {
        io.to(id).emit("game-ended");
        delete games[id];
        console.log(`[${id}] Game ended due to disconnect.`);
        break;
      }
    }
  });
});
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

function checkWinner(board: (string | null)[]): number[] | null {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }

  return null;
}
