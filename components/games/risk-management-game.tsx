"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const scenarios = [
  {
    name: "High-risk stock",
    idealRisk: 80,
    idealReward: 90,
    explanation: "High-risk stocks offer potential for high returns but come with significant volatility.",
  },
  {
    name: "Government bond",
    idealRisk: 10,
    idealReward: 20,
    explanation: "Government bonds are generally low-risk investments with modest returns.",
  },
  {
    name: "Real estate investment",
    idealRisk: 50,
    idealReward: 60,
    explanation:
      "Real estate can offer a balance of risk and reward, with potential for both appreciation and rental income.",
  },
  {
    name: "Cryptocurrency",
    idealRisk: 90,
    idealReward: 95,
    explanation:
      "Cryptocurrencies are highly volatile and speculative, offering potential for high rewards but with extreme risk.",
  },
  {
    name: "Mutual fund",
    idealRisk: 40,
    idealReward: 50,
    explanation: "Mutual funds offer diversification and professional management, balancing risk and reward.",
  },
]

export function RiskManagementGame() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0])
  const [riskLevel, setRiskLevel] = useState(50)
  const [rewardLevel, setRewardLevel] = useState(50)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const shuffled = [...scenarios].sort(() => 0.5 - Math.random())
    setCurrentScenario(shuffled[round - 1])
    setRiskLevel(50)
    setRewardLevel(50)
  }, [round])

  useEffect(() => {
    if (round > 5) {
      endGame()
    }
  }, [round])

  const handleSubmit = () => {
    const riskDiff = Math.abs(riskLevel - currentScenario.idealRisk)
    const rewardDiff = Math.abs(rewardLevel - currentScenario.idealReward)
    const totalDiff = riskDiff + rewardDiff

    let points = 0
    if (totalDiff <= 10) points = 3
    else if (totalDiff <= 20) points = 2
    else if (totalDiff <= 30) points = 1

    setScore(score + points)

    toast({
      title: `You earned ${points} points!`,
      description: `Ideal balance: Risk ${currentScenario.idealRisk}, Reward ${currentScenario.idealReward}. ${currentScenario.explanation}`,
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
        <CardTitle className="font-medieval text-2xl text-amber-300">Risk Ruins</CardTitle>
        <CardDescription className="text-purple-200">
          Balance the risk and reward for different investment scenarios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameOver ? (
          <>
            <p className="text-lg text-center text-purple-100">Round {round}/5</p>
            <p className="text-xl text-center text-amber-300">Scenario: {currentScenario.name}</p>
            <div className="space-y-4">
              <div>
                <p className="text-purple-200">Risk Level: {riskLevel}</p>
                <Slider value={[riskLevel]} onValueChange={(value) => setRiskLevel(value[0])} max={100} step={1} />
              </div>
              <div>
                <p className="text-purple-200">Reward Level: {rewardLevel}</p>
                <Slider value={[rewardLevel]} onValueChange={(value) => setRewardLevel(value[0])} max={100} step={1} />
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Submit Balance
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

