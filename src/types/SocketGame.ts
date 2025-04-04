export type PlayerData = {
    id: string;
    symbol: "X" | "O";
    score: number;
    readyToRestart: boolean;
    number: 1 | 2;
};
  
  
export type SocketGameData = {
    id: string;
    players: PlayerData[];
    board: (string | null)[];
    turn: "X" | "O";
    winner: "X" | "O" | null;
    fadingIndex?: number | null;
    winningLine?: number[] | null;
    animatedIndices?: number[];
};
  