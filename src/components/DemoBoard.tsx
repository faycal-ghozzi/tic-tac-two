"use client";

import BoardCore from "./BoardCore";
import { useEffect, useState } from "react";

export default function DemoBoard({
    board,
    winningLine = null,
    fadingIndex = null,
    compact = false,
  }: {
    board: (string | null)[];
    winningLine?: number[] | null;
    fadingIndex?: number | null;
    compact?: boolean;
  }) {
    const [animated, setAnimated] = useState<Set<number>>(new Set());
  
    useEffect(() => {
      setAnimated(new Set(winningLine || []));
    }, [winningLine]);
  
    return (
      <div className={compact ? "scale-75 sm:scale-90" : "scale-90 sm:scale-100"}>
        <BoardCore
          board={board}
          onCellClick={() => {}}
          winner={null}
          winningLine={winningLine}
          animatedIndices={animated}
          fadingIndex={fadingIndex}
        />
      </div>
    );
  }
  
