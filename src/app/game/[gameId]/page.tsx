"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Board from "../../../components/Board";

export default function GameDetailPage() {

  type GameType = {
    playerX: string;
    playerO: string | null;
    board: (string | null)[];
    turn: "playerX" | "playerO";
    status: string;
    winner: string | null;
  };

  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const gameRef = doc(db, "games", gameId);
    const unsubscribe = onSnapshot(
      gameRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setGame(docSnapshot.data() as GameType);
        } else {
          console.error("Game does not exist");
          setGame(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching game:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [gameId]);

  if (loading) return <div>Loading game...</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Game ID: {gameId}</h1>
      <Board isOnline={true} gameId={gameId} game={game} />
    </main>
  );
}
