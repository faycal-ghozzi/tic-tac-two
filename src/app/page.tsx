'use client'

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import socket from "@/lib/socket"
import dynamic from "next/dynamic"

// Lazy load background (client only)
const XOBackground = dynamic(() => import('@/components/XOBackground'), {
  ssr: false,
})

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    socket.on("game-created", (gameId: string) => {
      router.push(`/game/online/${gameId}`)
    })

    return () => {
      socket.off("game-created")
    }
  }, [router])

  const createOnlineGame = () => {
    socket.emit("create-game")
  }

  return (
    <>
      {/* 🌌 Fullscreen animated XO background */}
      <XOBackground />

      {/* 💬 Centered content with glassy background */}
      <div className="fixed inset-0 z-10 flex items-center justify-center px-4 pointer-events-none">
        <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-xl max-w-md w-full p-8 text-center pointer-events-auto">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Tic Tac <span className="animate-aurora bg-clip-text text-transparent">TWO!</span>
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            fewer moves, more strategy.
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full">
            <Link href="/game/local" className="menu-btn menu-btn-purple">
              Local Multiplayer
            </Link>
            <button onClick={createOnlineGame} className="menu-btn menu-btn-blue">
              Create Online Game
            </button>
            <Link href="/how-to-play" className="menu-btn menu-btn-green">
              How to Play
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
