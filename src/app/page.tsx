export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Tic Tac Toe!</h1>
      <div className="space-y-4">
        <a href="/game" className="bg-blue-500 text-white px-4 py-2 rounded">
          Play Game
        </a>
        <a href="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded">
          View Scoreboard
        </a>
      </div>
    </main>
  );
}
