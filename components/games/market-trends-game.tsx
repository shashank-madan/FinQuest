"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const trends = [
  {
    description: "Interest rates are rising",
    correctPrediction: "Bond prices will fall",
    explanation: "When interest rates rise, existing bonds become less attractive, causing their prices to fall.",
  },
  {
    description: "Company XYZ announces record profits",
    correctPrediction: "XYZ stock price will rise",
    explanation: "Strong profits often lead to increased investor confidence and higher stock prices.",
  },
  {
    description: "Oil supply disruption in major producing country",
    correctPrediction: "Oil prices will rise",
    explanation: "A decrease in supply typically leads to an increase in price, assuming demand remains constant.",
  },
  {
    description: "Central bank announces quantitative easing",
    correctPrediction: "Stock market will likely rise",
    explanation: "Quantitative easing often leads to increased liquidity in the market, which can boost stock prices.",
  },
  {
    description: "Major tech company faces antitrust lawsuit",
    correctPrediction: "Tech sector stocks may fall",
    explanation: "Legal challenges can create uncertainty, potentially leading to a decrease in stock prices.",
  },
  {
    description: "Country A's currency is devalued",
    correctPrediction: "Country A's exports will become more competitive",
    explanation: "A weaker currency makes a country's exports cheaper and more attractive in the global market.",
  },
  {
    description: "Unemployment rate decreases",
    correctPrediction: "Consumer spending may increase",
    explanation: "Lower unemployment often leads to increased consumer confidence and spending.",
  },
]

const predictions = [
  "Bond prices will fall",
  "XYZ stock price will rise",
  "Oil prices will rise",
  "Stock market will likely rise",
  "Tech sector stocks may fall",
  "Country A's exports will become more competitive",
  "Consumer spending may increase",
]

export function MarketTrendsGame() {
  const [currentTrend, setCurrentTrend] = useState(trends[0])
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    const shuffled = [...trends].sort(() => 0.5 - Math.random())
    setCurrentTrend(shuffled[round - 1])
    const shuffledPredictions = [...predictions].sort(() => 0.5 - Math.random())
    setOptions(shuffledPredictions.slice(0, 4))
  }, [round])

  const handleGuess = (guess: string) => {
    if (guess === currentTrend.correctPrediction) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: `Your prediction was accurate. ${currentTrend.explanation}`,
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct prediction was: ${currentTrend.correctPrediction}. ${currentTrend.explanation}`,
        variant: "destructive",
      })
    }

    if (round < 5) {
      setRound(round + 1)
    } else {
      // Game over logic
      const earnedCoins = score * 10
      const newTotalCoins = (Number.parseInt(localStorage.getItem("userCoins") || "0", 10) + earnedCoins).toString()
      localStorage.setItem("userCoins", newTotalCoins)
      toast({
        title: "Game Over!",
        description: `Your final score is ${score + (guess === currentTrend.correctPrediction ? 1 : 0)} out of 5. You earned ${earnedCoins} coins!`,
        variant: "default",
      })
    }
  }

  return (
    <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="font-medieval text-2xl text-amber-300">Market Mystic Mountains</CardTitle>
        <CardDescription className="text-purple-200">Predict market trends based on given scenarios.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg text-center text-purple-100">Round {round}/5</p>
        <p className="text-xl text-center text-amber-300">{currentTrend.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {options.map((prediction, index) => (
            <Button key={index} onClick={() => handleGuess(prediction)} variant="outline">
              {prediction}
            </Button>
          ))}
        </div>
        <p className="text-lg text-center text-purple-100">Score: {score}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="ghost">
          <Link href="/">Return to Realm Map</Link>
        </Button>
        {round > 5 && (
          <Button
            onClick={() => {
              setRound(1)
              setScore(0)
            }}
          >
            Play Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

