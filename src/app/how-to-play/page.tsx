"use client";

import Link from "next/link";
import DemoBoard from "../../components/DemoBoard";
import BoardCoreCompact from "../../components/BoardCoreCompact";
import AnimatedDemo from "../../components/AnimatedDemo";



export default function HowToPlayPage() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-12 bg-white text-gray-800 overflow-y-auto lg:overflow-y-scroll">
      <div className="w-full max-w-5xl mx-auto space-y-16">

        <h1 className="text-4xl font-bold text-center">How to Play</h1>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Objective</h2>
          <p>
            Get three of your symbols (X or O) in a row — horizontally, vertically, or diagonally — before your opponent does.
          </p>
        </section>

        <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Fading Example</h2>
        <p className="mb-4">
            Players can only have 2 symbols at once. When placing a third, the oldest one fades away.
        </p>
        <div className="flex justify-center">
            <BoardCoreCompact
            board={[
                "X", "X", null,
                null, "O", null,
                "O", null, "X",
            ]}
            fadingIndex={0}
            />
        </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Winning Lines</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-center mb-2">Horizontal Win</p>
              <DemoBoard
                board={[
                  "O", "O", "O",
                  null, "X", null,
                  "X", null, null,
                ]}
                winningLine={[0, 1, 2]}
              />
            </div>

            <div>
              <p className="text-center mb-2">Vertical Win</p>
              <DemoBoard
                board={[
                  "X", "O", null,
                  "X", "O", null,
                  null, "O", null,
                ]}
                winningLine={[1, 4, 7]}
              />
            </div>

            <div>
              <p className="text-center mb-2">Diagonal Win</p>
              <DemoBoard
                board={[
                  "O", null, "X",
                  null, "O", "X",
                  null, null, "O",
                ]}
                winningLine={[0, 4, 8]}
              />
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Fading Mechanic</h2>
          <p>
            Each player can only have <strong>2 active symbols</strong> on the board at a time.
            Placing a 3rd causes the <strong>oldest one to fade</strong> and disappear.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Strategy Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-left mx-auto max-w-md">
            <li>Use fading to your advantage — plan which one disappears.</li>
            <li>Try to bait your opponent into a dead move.</li>
            <li>Look for diagonal traps — they’re harder to spot!</li>
            <li>Keep center control — it touches the most lines (4 total).</li>
          </ul>
        </section>

        <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Animated Demo</h2>
            <p className="mb-4">
                Here’s an example of how pieces fade and move over time.
            </p>
            <AnimatedDemo />
        </section>

        <div className="text-center pt-6">
          <Link href="/" className="menu-btn menu-btn-purple">
            Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
