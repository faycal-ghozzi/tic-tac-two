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
    fadingIndex,
    winningLine,
    animatedIndices,
  }: BoardCoreProps) {
    return (
      <div className="grid grid-cols-3 gap-2 w-48 mb-4">
        {board.map((cell, index) => {
          const isFaded = fadingIndex === index;
          const isWinning = winningLine?.includes(index);
          const isAnimated = animatedIndices.has(index);
  
          const fadeClass = isFaded ? "opacity-50" : "opacity-100";
          const bounceClass = isWinning ? "animate-bounce-once" : "";
          const popClass = isAnimated ? "animate-pop" : "";
  
          const symbolColor =
            cell === "X" ? "text-[#EF476F]" : cell === "O" ? "text-[#06D6A0]" : "";
  
          return (
            <div
              key={index}
              onClick={() => onCellClick(index)}
              className="w-16 h-16 flex items-center justify-center border border-gray-300 text-2xl font-bold cursor-pointer transition-all duration-300"
            >
              {cell && (
                <span className={`${symbolColor} ${fadeClass} ${popClass} ${bounceClass}`}>
                  {cell}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  