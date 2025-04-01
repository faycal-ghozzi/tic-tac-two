"use client";

import { useEffect, useState } from "react";
import BoardCoreCompact from "./BoardCoreCompact";

const steps: { 
    board: (string | null)[]; 
    fadingIndex?: number; 
    winningLine?: number[];
}[] = [
  { board: Array(9).fill(null) },
  { board: ["X", null, null, 
            null, null, null, 
            null, null, null] },
  { board: ["X", null, null, 
            null, "O", null, 
            null, null, null] },
  { board: ["X", null, "X", 
            null, "O", null, 
            null, null, null] },
  {
    board: ["X", null, "X", 
            null, "O", null, 
            "O", null, null],
  },
  {
    board: ["X", null, "X", 
            null, "O", null, 
            "O", null, "X"],
    fadingIndex: 0,
  },
  {
    board: [null, null, "X", 
            "O", "O", null, 
            "O", null, "X"],
    fadingIndex: 6,
  },
  {
    board: [null, null, "X", 
            "O", "O", "X", 
            null, null, "X"],
    winningLine: [2, 5, 8],
    },
];

export default function AnimatedDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">
      <BoardCoreCompact
        board={steps[step].board}
        fadingIndex={steps[step].fadingIndex}
        winningLine={steps[step].winningLine}
      />
    </div>
  );
}
