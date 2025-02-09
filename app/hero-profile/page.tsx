"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type UserProfile = {
  name: string
  level: number
  rank: string
  coins: number
  score: number
  questsCompleted: number
  totalQuests: number
}

const dummyUser: UserProfile = {
  name: "Sir Finnegan Goldsworth",
  level: 12,
  rank: "Master Alchemist",
  coins: 2450,
  score: 7200,
  questsCompleted: 25,
  totalQuests: 50,
}

export default function HeroProfile() {
  const [user, setUser] = useState<UserProfile>(dummyUser)

  useEffect(() => {
    const savedScore = localStorage.getItem("userScore")
    if (savedScore) {
      setUser((prevUser) => ({
        ...prevUser,
        score: Number.parseInt(savedScore, 10),
      }))
    }
  }, [])

  // Calculate progress percentages
  const xpProgress = (user.score % 1000) / 10 // XP bar (progress to next level)
  const questProgress = (user.questsCompleted / user.totalQuests) * 100 // Quest completion %
  const coinGoal = 5000 // Set a goal for coins
  const coinProgress = (user.coins / coinGoal) * 100 // Coin collection %

  return (
    <div className="font-medieval">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Hero Profile</CardTitle>
          <CardDescription className="text-purple-200">Your financial journey stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-purple-200 space-y-3">
            <p><span className="text-amber-300 font-bold">Name:</span> {user.name}</p>
            <p><span className="text-amber-300 font-bold">Level:</span> {user.level}</p>
            <p><span className="text-amber-300 font-bold">Rank:</span> {user.rank}</p>
            <p><span className="text-amber-300 font-bold">Coins:</span> {user.coins}</p>
            <p><span className="text-amber-300 font-bold">Score:</span> {user.score}</p>
            <p><span className="text-amber-300 font-bold">Quests Completed:</span> {user.questsCompleted} / {user.totalQuests}</p>

            {/* Progress Bars in One Row */}
            <div className="flex justify-between space-x-6 mt-6">
              {/* XP Progress */}
              <div className="w-1/3">
                <p className="text-amber-300 font-bold text-center">Level Progress</p>
                <Progress value={xpProgress} className="mt-1 transition-all duration-700 bg-yellow-900" />
                <p className="text-sm text-purple-300 text-center mt-1">{user.score % 1000}/1000 XP</p>
              </div>

              {/* Quest Progress */}
              <div className="w-1/3">
                <p className="text-amber-300 font-bold text-center">Quest Completion</p>
                <Progress value={questProgress} className="mt-1 transition-all duration-700 bg-yellow-900" />
                <p className="text-sm text-purple-300 text-center mt-1">{questProgress.toFixed(1)}% complete</p>
              </div>

              {/* Coin Collection Progress */}
              <div className="w-1/3">
                <p className="text-amber-300 font-bold text-center">Coin Goal</p>
                <Progress value={coinProgress} className="mt-1 transition-all duration-700 bg-yellow-900" />
                <p className="text-sm text-purple-300 text-center mt-1">{coinProgress.toFixed(1)}% of 5000 coins</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
