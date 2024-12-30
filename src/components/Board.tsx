import { useState } from "react";

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {board.map((cell, index) => (
        <div
          key={index}
          className="w-16 h-16 flex items-center justify-center border border-gray-300"
          onClick={() => handleClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
