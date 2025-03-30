interface BoardCoreProps {
    board: (string | null)[];
    onCellClick: (index: number) => void;
    winner: string | null;
    fadingIndex: number | null;
    semiFadingIndex: number | null;
  }
  
  export default function BoardCore({
    board,
    onCellClick,
    winner,
    fadingIndex,
    semiFadingIndex,
  }: BoardCoreProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 w-48 mb-4">
          {board.map((cell, index) => {
            const isFading = fadingIndex === index;
            const isSemiFading = semiFadingIndex === index;
  
            const opacityClass = isFading
              ? "opacity-0"
              : isSemiFading
              ? "opacity-50"
              : "opacity-100";
  
            const baseClasses = "transition-opacity duration-500";
  
            return (
              <div
                key={index}
                onClick={() => onCellClick(index)}
                className="w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer"
              >
                {cell === "X" && (
                  <span className={`text-[#EF476F] ${baseClasses} ${opacityClass}`}>
                    X
                  </span>
                )}
                {cell === "O" && (
                  <span className={`text-[#06D6A0] ${baseClasses} ${opacityClass}`}>
                    O
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {winner && (
          <div className="mb-4 text-lg font-bold">
            {winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`}
          </div>
        )}
      </div>
    );
  }
  