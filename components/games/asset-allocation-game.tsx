"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const assetClasses = ["Stocks", "Bonds", "Real Estate", "Cash"]

const scenarios = [
  {
    name: "Conservative",
    ideal: [20, 50, 20, 10],
    explanation: "A conservative portfolio focuses on preserving capital with a higher allocation to bonds and cash.",
  },
  {
    name: "Moderate",
    ideal: [50, 30, 15, 5],
    explanation: "A moderate portfolio balances growth and income, with a higher allocation to stocks.",
  },
  {
    name: "Aggressive",
    ideal: [70, 20, 5, 5],
    explanation: "An aggressive portfolio aims for high growth with a significant allocation to stocks.",
  },
  {
    name: "Very Aggressive",
    ideal: [80, 10, 5, 5],
    explanation: "A very aggressive portfolio maximizes growth potential with a heavy allocation to stocks.",
  },
  {
    name: "Income",
    ideal: [30, 50, 15, 5],
    explanation: "An income-focused portfolio aims to generate regular income with a higher allocation to bonds.",
  },
]

export function AssetAllocationGame() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0])
  const [allocation, setAllocation] = useState([25, 25, 25, 25])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const shuffled = [...scenarios].sort(() => 0.5 - Math.random())
    setCurrentScenario(shuffled[round - 1])
    setAllocation([25, 25, 25, 25])
  }, [round])

  useEffect(() => {
    if (round > 5) {
      endGame()
    }
  }, [round])

  const handleAllocationChange = (index: number, value: number) => {
    const newAllocation = [...allocation]
    newAllocation[index] = value
    const sum = newAllocation.reduce((a, b) => a + b, 0)
    if (sum > 100) {
      const diff = sum - 100
      newAllocation[index] -= diff
    }
    setAllocation(newAllocation)
  }

  const handleSubmit = () => {
    const totalDiff = currentScenario.ideal.reduce((sum, ideal, index) => sum + Math.abs(ideal - allocation[index]), 0)

    let points = 0
    if (totalDiff <= 20) points = 3
    else if (totalDiff <= 40) points = 2
    else if (totalDiff <= 60) points = 1

    setScore(score + points)

    toast({
      title: `You earned ${points} points!`,
      description: `Ideal allocation: ${currentScenario.ideal.join(", ")}. ${currentScenario.explanation}`,
      variant: points > 0 ? "default" : "destructive",
    })

    setRound(round + 1)
  }

  const endGame = () => {
    setGameOver(true)
    const earnedCoins = score * 10
    const currentCoins = Number.parseInt(localStorage.getItem("userCoins") || "0", 10)
    const newTotalCoins = currentCoins + earnedCoins
    localStorage.setItem("userCoins", newTotalCoins.toString())

    // Trigger a custom event to update the coin display in the layout
    window.dispatchEvent(new Event("coinsUpdated"))

    toast({
      title: "Game Over!",
      description: `Your final score is ${score} out of 15. You earned ${earnedCoins} coins!`,
    })
  }

  const resetGame = () => {
    setScore(0)
    setRound(1)
    setGameOver(false)
  }

  return (
    <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="font-medieval text-2xl text-amber-300">Asset Arcadia</CardTitle>
        <CardDescription className="text-purple-200">
          Allocate assets for different investment scenarios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameOver ? (
          <>
            <p className="text-lg text-center text-purple-100">Round {round}/5</p>
            <p className="text-xl text-center text-amber-300">Scenario: {currentScenario.name}</p>
            <div className="space-y-4">
              {assetClasses.map((asset, index) => (
                <div key={asset}>
                  <p className="text-purple-200">
                    {asset}: {allocation[index]}%
                  </p>
                  <Slider
                    value={[allocation[index]]}
                    onValueChange={(value) => handleAllocationChange(index, value[0])}
                    max={100}
                    step={1}
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Submit Allocation
            </Button>
          </>
        ) : (
          <p className="text-xl text-center text-amber-300">Game Over! Your final score: {score}/15</p>
        )}
        <p className="text-lg text-center text-purple-100">Score: {score}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="ghost">
          <Link href="/">Return to Realm Map</Link>
        </Button>
        {gameOver && <Button onClick={resetGame}>Play Again</Button>}
      </CardFooter>
    </Card>
  )
}

