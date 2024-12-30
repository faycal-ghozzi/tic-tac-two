export const getAIMove = (board: (string | null)[]): number => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };
  