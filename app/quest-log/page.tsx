// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function QuestLog() {
//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Quest Log</CardTitle>
//           <CardDescription className="text-purple-200">Track your financial adventures</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-purple-200">Quest tracking and progress features coming soon...</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// type Quest = {
//   id: number
//   name: string
//   description: string
//   progress: number // 0 to 100
//   status: "ongoing" | "completed"
// }

// const initialQuests: Quest[] = [
//   { id: 1, name: "Treasure Hunt", description: "Earn 1000 coins", progress: 80, status: "ongoing" },
//   { id: 2, name: "Mystic Spender", description: "Spend 500 coins", progress: 100, status: "completed" },
//   { id: 3, name: "Daily Login Streak", description: "Log in for 7 days", progress: 50, status: "ongoing" },
//   { id: 4, name: "Wealth Accumulator", description: "Save 2000 coins", progress: 40, status: "ongoing" },
//   { id: 5, name: "Shop Explorer", description: "Visit Mystic Market 5 times", progress: 70, status: "ongoing" },
//   { id: 6, name: "Code Collector", description: "Redeem 3 promo codes", progress: 30, status: "ongoing" },
// ]

// export default function QuestLog() {
//   const [quests, setQuests] = useState<Quest[]>([])

//   useEffect(() => {
//     // Simulate fetching user progress data
//     const fetchQuests = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       setQuests(initialQuests)
//     }

//     fetchQuests()
//   }, [])

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Quest Log</CardTitle>
//           <CardDescription className="text-purple-200">Track your financial adventures</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {quests.length === 0 ? (
//             <p className="text-purple-200">Loading quests...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {quests.map((quest) => (
//                 <div
//                   key={quest.id}
//                   className={`p-3 rounded-lg ${quest.status === "completed" ? "bg-green-900/40" : "bg-purple-800/40"}`}
//                 >
//                   <h3 className="text-lg font-bold text-amber-300">{quest.name}</h3>
//                   <p className="text-purple-200">{quest.description}</p>
//                   <Progress value={quest.progress} className="mt-2 transition-all duration-700" />
//                   <p className={`text-sm mt-1 ${quest.status === "completed" ? "text-green-400" : "text-purple-300"}`}>
//                     {quest.status === "completed" ? "✅ Completed" : `Progress: ${quest.progress}%`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Quest = {
  id: number
  name: string
  description: string
  progress: number // 0 to 100
  status: "ongoing" | "completed"
}

const initialQuests: Quest[] = [
  { id: 1, name: "Treasure Hunt", description: "Earn 1000 coins", progress: 80, status: "ongoing" },
  { id: 2, name: "Mystic Spender", description: "Spend 500 coins", progress: 75, status: "ongoing" },
  { id: 3, name: "Daily Login Streak", description: "Log in for 7 days", progress: 50, status: "ongoing" },
  { id: 4, name: "Wealth Accumulator", description: "Save 2000 coins", progress: 40, status: "ongoing" },
  { id: 5, name: "Shop Explorer", description: "Visit Mystic Market 5 times", progress: 70, status: "ongoing" },
  { id: 6, name: "Code Collector", description: "Redeem 3 promo codes", progress: 30, status: "ongoing" },
]

export default function QuestLog() {
  const [quests, setQuests] = useState<Quest[]>([])

  useEffect(() => {
    // Simulate fetching user progress data
    const fetchQuests = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setQuests(initialQuests)
    }

    fetchQuests()
  }, [])

  return (
    <div className="font-medieval">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Quest Log</CardTitle>
          <CardDescription className="text-purple-200">Track your financial adventures</CardDescription>
        </CardHeader>
        <CardContent>
          {quests.length === 0 ? (
            <p className="text-purple-200">Loading quests...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3 rounded-lg ${quest.status === "completed" ? "bg-green-900/40" : "bg-purple-800/40"}`}
                >
                  <h3 className="text-lg font-bold text-amber-300">{quest.name}</h3>
                  <p className="text-purple-200">{quest.description}</p>
                  {/* Single color for progress bar */}
                  <Progress
                    value={quest.progress}
                    className="mt-2 transition-all duration-700 bg-yellow-900" // Use a single color for the progress bar
                  />
                  <p className={`text-sm mt-1 ${quest.status === "completed" ? "text-green-400" : "text-purple-300"}`}>
                    {quest.status === "completed" ? "✅ Completed" : `Progress: ${quest.progress}%`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
