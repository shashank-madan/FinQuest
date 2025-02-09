"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const taxBrackets = [
  { income: "$0 - $9,950", rate: "10%", explanation: "This is the lowest tax bracket for single filers." },
  {
    income: "$9,951 - $40,525",
    rate: "12%",
    explanation: "This bracket covers a large portion of low to middle-income earners.",
  },
  { income: "$40,526 - $86,375", rate: "22%", explanation: "This bracket sees a significant jump in tax rate." },
  { income: "$86,376 - $164,925", rate: "24%", explanation: "This bracket covers upper-middle-income earners." },
  {
    income: "$164,926 - $209,425",
    rate: "32%",
    explanation: "This bracket sees another significant increase in tax rate.",
  },
  { income: "$209,426 - $523,600", rate: "35%", explanation: "This is the second-highest tax bracket." },
  { income: "$523,601 or more", rate: "37%", explanation: "This is the highest tax bracket for top earners." },
]

export function TaxBracketGame() {
  const [currentBracket, setCurrentBracket] = useState(taxBrackets[0])
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const shuffled = [...taxBrackets].sort(() => 0.5 - Math.random())
    setCurrentBracket(shuffled[round - 1])
    const rates = taxBrackets.map((b) => b.rate)
    const shuffledRates = rates.sort(() => 0.5 - Math.random())
    setOptions(shuffledRates.slice(0, 4))
  }, [round])

  useEffect(() => {
    if (round > 5) {
      endGame()
    }
  }, [round])

  const handleGuess = (guess: string) => {
    if (guess === currentBracket.rate) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: `The tax rate for income ${currentBracket.income} is ${currentBracket.rate}. ${currentBracket.explanation}`,
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct tax rate for income ${currentBracket.income} is ${currentBracket.rate}. ${currentBracket.explanation}`,
        variant: "destructive",
      })
    }

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
      description: `Your final score is ${score} out of 5. You earned ${earnedCoins} coins!`,
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
        <CardTitle className="font-medieval text-2xl text-amber-300">Treasury Temple</CardTitle>
        <CardDescription className="text-purple-200">
          Match the income level to its correct tax bracket.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameOver ? (
          <>
            <p className="text-lg text-center text-purple-100">Round {round}/5</p>
            <p className="text-xl text-center text-amber-300">Income: {currentBracket.income}</p>
            <div className="grid grid-cols-2 gap-4">
              {options.map((rate, index) => (
                <Button key={index} onClick={() => handleGuess(rate)} variant="outline">
                  {rate}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xl text-center text-amber-300">Game Over! Your final score: {score}/5</p>
        )}
        <p className="text-lg text-center text-purple-100">Score: {score}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild>
          <Link href="/">Return to Realm Map</Link>
        </Button>
        {gameOver && <Button onClick={resetGame}>Play Again</Button>}
      </CardFooter>
    </Card>
  )
}

