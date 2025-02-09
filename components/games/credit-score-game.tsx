"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const actions = [
  {
    action: "Pay all bills on time",
    impact: "Increase",
    explanation: "Timely payments are the most important factor in your credit score.",
  },
  {
    action: "Max out credit cards",
    impact: "Decrease",
    explanation: "High credit utilization negatively impacts your credit score.",
  },
  {
    action: "Apply for multiple new credit cards",
    impact: "Decrease",
    explanation: "Multiple hard inquiries in a short time can lower your score.",
  },
  {
    action: "Keep credit utilization low",
    impact: "Increase",
    explanation: "Low credit utilization shows responsible credit management.",
  },
  {
    action: "Close old credit accounts",
    impact: "Decrease",
    explanation: "Closing old accounts can shorten your credit history length.",
  },
  {
    action: "Dispute errors on credit report",
    impact: "Increase",
    explanation: "Removing errors can improve your credit score.",
  },
  {
    action: "Make minimum payments only",
    impact: "Decrease",
    explanation: "While it prevents missed payments, high balances can hurt your score.",
  },
  {
    action: "Maintain a mix of credit types",
    impact: "Increase",
    explanation: "A diverse credit mix shows you can handle different types of credit.",
  },
]

export function CreditScoreGame() {
  const [currentAction, setCurrentAction] = useState(actions[0])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    const shuffled = [...actions].sort(() => 0.5 - Math.random())
    setCurrentAction(shuffled[round - 1])
  }, [round])

  const handleGuess = (guess: string) => {
    if (guess === currentAction.impact) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: `${currentAction.action} does ${currentAction.impact.toLowerCase()} your credit score. ${currentAction.explanation}`,
      })
    } else {
      toast({
        title: "Incorrect",
        description: `${currentAction.action} actually ${currentAction.impact.toLowerCase()}s your credit score. ${currentAction.explanation}`,
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
        description: `Your final score is ${score + (guess === currentAction.impact ? 1 : 0)} out of 5. You earned ${earnedCoins} coins!`,
      })
    }
  }

  return (
    <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="font-medieval text-2xl text-amber-300">Crystal Credit Kingdom</CardTitle>
        <CardDescription className="text-purple-200">
          Guess whether each action will increase or decrease your credit score.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg text-center text-purple-100">Round {round}/5</p>
        <p className="text-xl text-center text-amber-300">{currentAction.action}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => handleGuess("Increase")} variant="outline">
            Increase
          </Button>
          <Button onClick={() => handleGuess("Decrease")} variant="outline">
            Decrease
          </Button>
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

