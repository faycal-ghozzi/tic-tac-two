import { useState } from "react";
import { getAIMove } from "../utils/ai";

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);

  const handleAIMove = () => {
    const aiMove = getAIMove(board);
    if (aiMove !== undefined) handleClick(aiMove);
  };

  const handleClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    const playerSymbol = isXNext ? "X" : "O";

    // Add the current move to the board and the player's move list
    newBoard[index] = playerSymbol;
    if (isXNext) {
      const newXMoves = [...xMoves, index];
      if (newXMoves.length > 3) {
        const oldestMove = newXMoves.shift();
        if (oldestMove !== undefined) newBoard[oldestMove] = null;
      }
      setXMoves(newXMoves);
    } else {
      const newOMoves = [...oMoves, index];
      if (newOMoves.length > 3) {
        const oldestMove = newOMoves.shift();
        if (oldestMove !== undefined) newBoard[oldestMove] = null;
      }
      setOMoves(newOMoves);
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (!isXNext) setTimeout(handleAIMove, 500);

  };

  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {board.map((cell, index) => (
        <div
          key={index}
          className="w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
