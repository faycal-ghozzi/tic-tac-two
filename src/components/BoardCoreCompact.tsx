interface Props {
    board: (string | null)[];
    winningLine?: number[] | null;
    fadingIndex?: number | null;
  }
  
  export default function BoardCoreCompact({
    board,
    winningLine = null,
    fadingIndex = null,
  }: Props) {
    return (
      <div className="grid grid-cols-3 gap-[6px] p-2 rounded-lg shadow">
        {board.map((cell, index) => {
          const isFaded = fadingIndex === index;
          const isWinning = winningLine?.includes(index);
          const fadeClass = isFaded ? "opacity-50" : "opacity-100";
          const bounceClass = isWinning ? "animate-win-bounce" : "";
          const symbolColor =
            cell === "X" ? "text-[#EF476F]" : cell === "O" ? "text-[#06D6A0]" : "";
  
          return (
            <div
              key={index}
              className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-gray-300 text-2xl sm:text-3xl font-bold bg-gray-100 rounded"
            >
              {cell && (
                <span className={`${symbolColor} ${fadeClass} ${bounceClass}`}>
                  {cell}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  