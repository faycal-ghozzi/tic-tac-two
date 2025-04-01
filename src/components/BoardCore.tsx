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
      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-lg shadow-lg">
        {board.map((cell, index) => {
          const isFaded = fadingIndex === index;
          const isWinning = winningLine?.includes(index);
          const isAnimated = animatedIndices.has(index);

          const fadeClass = isFaded ? "opacity-50" : "opacity-100";
          const bounceClass = isWinning ? "animate-win-bounce" : "";
          const popClass = isAnimated ? "animate-pop" : "";

          const symbolColor =
            cell === "X" ? "text-[#EF476F]" : cell === "O" ? "text-[#06D6A0]" : "";

          return (
            <div
              id={`cell-${index}`}
              key={index}
              onClick={() => onCellClick(index)}
              className="w-24 h-24 flex items-center justify-center border border-gray-300 text-3xl font-extrabold rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
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
  