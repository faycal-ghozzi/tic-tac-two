import { checkWinner } from "./checkWinner";

export type Turn = "X" | "O";

export interface GameState {
  board: (string | null)[];
  turn: Turn;
  winner: string | null;
  xHistory: number[];
  oHistory: number[];
  fadingIndex: number | null;
  fadingTurn: Turn | null;
}

export interface MoveResult {
  newState: GameState;
  winningLine: number[] | null;
  animatedIndices: Set<number>;
}

export function handleMove(
  index: number,
  state: GameState
): MoveResult | null {
  const { board, turn, winner, xHistory, oHistory, fadingIndex, fadingTurn } = state;

  if (board[index] !== null || winner) return null;

  const newBoard = [...board];
  const newXHistory = [...xHistory];
  const newOHistory = [...oHistory];
  let newFadingIndex: number | null = null;
  let newFadingTurn: Turn | null = null;

  if (fadingIndex !== null && fadingTurn !== turn) {
    newBoard[fadingIndex] = null;
  }

  newBoard[index] = turn;

  if (turn === "X") {
    newXHistory.push(index);
    if (newXHistory.length > 2) {
      newFadingIndex = newXHistory.shift()!;
      newFadingTurn = "X";
    }
  } else {
    newOHistory.push(index);
    if (newOHistory.length > 2) {
      newFadingIndex = newOHistory.shift()!;
      newFadingTurn = "O";
    }
  }

  const winningLine = checkWinner(newBoard);
  const winnerMark = winningLine ? turn : null;

  const newGameState: GameState = {
    board: newBoard,
    turn: winnerMark ? turn : (turn === "X" ? "O" : "X"),
    winner: winnerMark,
    xHistory: newXHistory,
    oHistory: newOHistory,
    fadingIndex: newFadingIndex,
    fadingTurn: newFadingTurn,
  };

  return {
    newState: newGameState,
    winningLine,
    animatedIndices: new Set(winningLine ?? [index]),
  };
}
