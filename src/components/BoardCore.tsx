interface BoardCoreProps {
    board: (string | null)[];
    onCellClick: (index: number) => void;
    winner: string | null;
    fadingIndex: number | null;
    winningLine: number[] | null;
    animatedIndices: Set<number>;
  }
  
  export default function BoardCore({
    board,
    onCellClick,
    winner,
    fadingIndex,
    winningLine,
    animatedIndices,
  }: BoardCoreProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 w-48 mb-4">
          {board.map((cell, index) => {
            const isFaded = fadingIndex === index;
            const isWinning = winningLine?.includes(index);
            const isAnimated = animatedIndices.has(index);
  
            const fadeClass = isFaded ? "opacity-50" : "opacity-100";
            const winClass = isWinning ? "bg-yellow-200" : "";
            const animClass = isAnimated ? "animate-pop" : "";
  
            return (
              <div
                key={index}
                onClick={() => onCellClick(index)}
                className={`w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer transition-all duration-300 ${winClass}`}
              >
                {cell === "X" && (
                  <span className={`text-[#EF476F] ${fadeClass} ${animClass}`}>
                    X
                  </span>
                )}
                {cell === "O" && (
                  <span className={`text-[#06D6A0] ${fadeClass} ${animClass}`}>
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
  