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
  let newXHistory = [...xHistory];
  let newOHistory = [...oHistory];
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

export const checkWinner = (board: (string | null)[]): number[] | null => {
    const winningCombinations = [
      [0, 1, 2], 
      [3, 4, 5],
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6], 
    ];
  
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [a, b, c];
      }
    }
  
    return null;
  };
  