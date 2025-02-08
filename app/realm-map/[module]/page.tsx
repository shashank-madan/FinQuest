"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const modules = {
  "crystal-credit-kingdom": {
    title: "Crystal Credit Kingdom",
    description: "Master the mystical arts of credit scoring",
    game: "Guess the Credit Impact",
    instructions: "Guess whether each action will increase or decrease your credit score.",
  },
  "treasury-temple": {
    title: "Treasury Temple",
    description: "Unlock the secrets of taxation",
    game: "Tax Bracket Challenge",
    instructions: "Place the income levels in the correct tax brackets.",
  },
  "risk-ruins": {
    title: "Risk Ruins",
    description: "Navigate the ancient paths of risk management",
    game: "Risk vs Reward Balance",
    instructions: "Balance the scales of risk and reward for different investment options.",
  },
  "asset-arcadia": {
    title: "Asset Arcadia",
    description: "Channel the powers of asset allocation",
    game: "Portfolio Puzzle",
    instructions: "Drag and drop assets to create a balanced portfolio.",
  },
  "market-mystic-mountains": {
    title: "Market Mystic Mountains",
    description: "Seek wisdom in the peaks of market trends",
    game: "Trend Prediction Oracle",
    instructions: "Predict the next move in the market trend based on given indicators.",
  },
}

export default function ModulePage({ params }: { params: { module: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<"start" | "playing" | "end">("start")

  const module = modules[params.module as keyof typeof modules]

  useEffect(() => {
    // Load user's score from localStorage
    const savedScore = localStorage.getItem("userScore")
    if (savedScore) {
      setScore(Number.parseInt(savedScore, 10))
    }
  }, [])

  const startGame = () => {
    setGameState("playing")
  }

  const endGame = (success: boolean) => {
    setGameState("end")
    if (success) {
      const newScore = score + 100
      setScore(newScore)
      localStorage.setItem("userScore", newScore.toString())
      toast({
        title: "Congratulations!",
        description: "You've earned 100 points!",
      })
    } else {
      toast({
        title: "Better luck next time!",
        description: "Keep practicing to improve your skills.",
        variant: "destructive",
      })
    }
  }

  if (!module) {
    return <div>Module not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">{module.title}</CardTitle>
          <CardDescription className="text-purple-200">{module.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-medieval text-amber-300 mb-4">{module.game}</h2>
          <p className="text-purple-200 mb-6">{module.instructions}</p>

          {gameState === "start" && (
            <Button onClick={startGame} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              Start Game
            </Button>
          )}

          {gameState === "playing" && (
            <div className="space-y-4">
              <p className="text-purple-200">Game in progress... (Implement actual game logic here)</p>
              <div className="space-x-4">
                <Button onClick={() => endGame(true)} className="bg-green-600 hover:bg-green-700">
                  Win Game
                </Button>
                <Button onClick={() => endGame(false)} className="bg-red-600 hover:bg-red-700">
                  Lose Game
                </Button>
              </div>
            </div>
          )}

          {gameState === "end" && (
            <div className="space-y-4">
              <p className="text-purple-200">Game Over</p>
              <Button
                onClick={() => router.push("/realm-map")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              >
                Return to Realm Map
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

