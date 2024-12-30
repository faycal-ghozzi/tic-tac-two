import Board from "../../components/Board";

export default function GamePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Play Tic Tac Toe</h1>
      <Board />
    </main>
  );
}
