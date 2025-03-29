interface BoardCoreProps {
    board: (string | null)[];
    onCellClick: (index: number) => void;
    winner: string | null;
  }
  
  export default function BoardCore({ board, onCellClick, winner }: BoardCoreProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 w-48 mb-4">
          {board.map((cell, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer"
              onClick={() => onCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="mb-4 text-lg font-bold">
            {winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`}
          </div>
        )}
      </div>
    );
  }
  