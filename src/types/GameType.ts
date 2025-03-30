export type GameType = {
    playerX: string;
    playerO: string | null;
    board: (string | null)[];
    turn: "playerX" | "playerO";
    status: string;
    winner: string | null;
  };