"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeroProfile() {
  const [score, setScore] = useState(0)

  useEffect(() => {
    const savedScore = localStorage.getItem("userScore")
    if (savedScore) {
      setScore(Number.parseInt(savedScore, 10))
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Hero Profile</CardTitle>
          <CardDescription className="text-purple-200">Your financial journey stats</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200">Current Score: {score}</p>
          {/* Add more profile information here */}
        </CardContent>
      </Card>
    </div>
  )
}

