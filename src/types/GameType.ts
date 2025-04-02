import type { PlayerData } from "./SocketGame";

export type GameType = {
  playerX: string;
  playerO: string | null;
  board: (string | null)[];
  turn: "playerX" | "playerO";
  status: string;
  winner: string | null;
  fadingIndex?: number | null;
  fadingTurn?: "X" | "O" | null;
  winningLine?: number[] | null;
  animatedIndices?: number[];
  players?: PlayerData[];
};
