// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // Example case data
// const fraudCases = [
//   {
//     id: 1,
//     title: "Credit Card Fraud",
//     description: "A series of transactions seem suspicious. Can you detect the fraud?",
//     transactions: [
//       { id: "t1", amount: 200, location: "NYC", suspicious: false },
//       { id: "t2", amount: 1200, location: "Miami", suspicious: true },
//       { id: "t3", amount: 15, location: "LA", suspicious: false },
//       { id: "t4", amount: 3000, location: "Tokyo", suspicious: true },
//     ],
//     correctAnswers: ["t2", "t4"],
//   },
//   {
//     id: 2,
//     title: "Identity Theft",
//     description: "Check these profiles for signs of stolen identities.",
//     profiles: [
//       { id: "p1", name: "John Doe", address: "123 Elm St", activity: "Normal" },
//       { id: "p2", name: "Jane Smith", address: "456 Oak St", activity: "Unusual" },
//       { id: "p3", name: "Emily Adams", address: "789 Maple St", activity: "Normal" },
//     ],
//     correctAnswers: ["p2"],
//   },
// ];

// export function FraudDetectionGame() {
//   const [currentCase, setCurrentCase] = useState<number>(0);
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//   const handleChoice = (item: string) => {
//     setSelectedItems((prev) => [...prev, item]);
//   };

//   const handleSubmit = () => {
//     const caseData = fraudCases[currentCase];
//     const isAllCorrect = selectedItems.every((item) =>
//       caseData.correctAnswers.includes(item)
//     );
//     setIsCorrect(isAllCorrect);
//   };

//   const handleNextCase = () => {
//     setCurrentCase((prev) => (prev + 1) % fraudCases.length); // Loop through cases
//     setSelectedItems([]);
//     setIsCorrect(null);
//   };

//   const currentCaseData = fraudCases[currentCase];

//   return (
//     <div className="flex flex-col items-center">
//       <Card className="bg-indigo-950/80 p-6 shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-amber-300">{currentCaseData.title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4">
//             <p className="text-purple-100">{currentCaseData.description}</p>
//           </div>

//           {currentCaseData.transactions && (
//             <div className="flex flex-col">
//               {currentCaseData.transactions.map((transaction) => (
//                 <Button
//                   key={transaction.id}
//                   variant="secondary"
//                   onClick={() => handleChoice(transaction.id)}
//                   className="mb-2"
//                 >
//                   {`Transaction ID: ${transaction.id} - $${transaction.amount} in ${transaction.location}`}
//                 </Button>
//               ))}
//             </div>
//           )}

//           {currentCaseData.profiles && (
//             <div className="flex flex-col">
//               {currentCaseData.profiles.map((profile) => (
//                 <Button
//                   key={profile.id}
//                   variant="secondary"
//                   onClick={() => handleChoice(profile.id)}
//                   className="mb-2"
//                 >
//                   {`Name: ${profile.name} - Activity: ${profile.activity}`}
//                 </Button>
//               ))}
//             </div>
//           )}

//           <div className="mt-4">
//             <Button variant="default" onClick={handleSubmit}>
//               Submit Choices
//             </Button>
//           </div>

//           {isCorrect !== null && (
//             <div className="mt-4">
//               <p className={isCorrect ? "text-green-500" : "text-red-500"}>
//                 {isCorrect ? "Correct! Well done, agent!" : "Incorrect, try again!"}
//               </p>
//             </div>
//           )}

//           <Button variant="ghost" className="mt-6" onClick={handleNextCase}>
//             Next Case
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// "use client"

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

const chapters = [
  {
    id: "1",
    title: "The Call to Action",
    description: "You receive a call from your manager about suspicious transactions.",
    choices: [
      { text: "Investigate Transactions", nextChapter: "2a" },
      { text: "Analyze Customer Accounts", nextChapter: "2b" },
    ],
    dialogue: "Sarah Turner: We've detected a surge in suspicious transactions. Can you help investigate?"
  },
  {
    id: "2a",
    title: "Suspicious Transactions",
    description: "You find a pattern in one of the flagged transactions, involving offshore accounts.",
    choices: [
      { text: "Contact Customer", nextChapter: "3a" },
      { text: "Continue Data Analysis", nextChapter: "3b" },
    ],
    dialogue: "Detective Jake: There seems to be an offshore account involved. What should we do next?"
  },
  {
    id: "3a",
    title: "Contacting the Customer",
    description: "You contact the customer, but they seem evasive.",
    choices: [
      { text: "Demand Answers", nextChapter: "4a" },
      { text: "Ask for Additional Information", nextChapter: "4b" },
    ],
    dialogue: "Customer: I don't know what you're talking about. I haven't been involved in anything suspicious."
  },
  {
    id: "3b",
    title: "Data Analysis",
    description: "You dig deeper into the data and find more links to other fraudulent accounts.",
    choices: [
      { text: "Alert Authorities", nextChapter: "4a" },
      { text: "Keep Investigating", nextChapter: "4b" },
    ],
    dialogue: "Detective Jake: This is getting bigger than we thought. We need to make a decision."
  },
  {
    id: "4a",
    title: "Confronting the Fraudster",
    description: "You confront the fraudster with enough evidence to expose them.",
    choices: [
      { text: "Report Immediately", nextChapter: "5a" },
      { text: "Wait for More Evidence", nextChapter: "5b" },
    ],
    dialogue: "Detective Jake: We need to act fast before they cover their tracks!"
  },
  {
    id: "4b",
    title: "Gathering More Information",
    description: "You decide to wait and gather more evidence, but the fraudster seems to be disappearing.",
    choices: [
      { text: "Contact Law Enforcement", nextChapter: "5a" },
      { text: "Keep Digging", nextChapter: "5b" },
    ],
    dialogue: "Sarah Turner: Time is running out. We need to act now!"
  },
  {
    id: "5a",
    title: "Exposing the Fraud",
    description: "You expose the fraudster immediately, saving the company from disaster.",
    choices: [],
    dialogue: "You acted fast and exposed the fraud in time! The company is saved."
  },
  {
    id: "5b",
    title: "Waiting for Proof",
    description: "You waited too long, and the fraudster escaped. The company suffered.",
    choices: [],
    dialogue: "You hesitated and the fraudster managed to escape, leaving the company in trouble."
  }
]

export function FraudDetectionGame() {
  const [currentChapter, setCurrentChapter] = useState<string>("1")
  const [gameOutcome, setGameOutcome] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState(10)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  // Start countdown timer
  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
        setScore(0)
      setGameOutcome("Game Over! Time's up! You failed to expose the fraud in time.")
      setIsTimerActive(false)
    }
  }, [timer, isTimerActive])

  const chapter = chapters.find(c => c.id === currentChapter)

  const handleChoice = (nextChapter: string) => {
    setCurrentChapter(nextChapter)
    setProgress((prev) => prev + 1)

    if (nextChapter === "5a") {
        setScore(5)
      setGameOutcome(`You exposed the fraud successfully and saved the company! Your final score is 5 out of 5. You earned 50 coins!`)
      endGame()
    } else if (nextChapter === "5b") {
        setScore(0)
      setGameOutcome("You waited too long, and the fraudster escaped. The company suffered. You get 0 coins! Better luck next time!")
      endGame()
    }
  }

  useEffect(() => {
    if (score == 5) {
      endGame()
    }
  }, [score])

  const endGame = () => {
    setGameOver(true)
    const earnedCoins = score * 10
    const currentCoins = Number.parseInt(localStorage.getItem("userCoins") || "0", 10)
    const newTotalCoins = currentCoins + earnedCoins
    localStorage.setItem("userCoins", newTotalCoins.toString())

    // Trigger a custom event to update the coin display in the layout
    window.dispatchEvent(new Event("coinsUpdated"))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }


  return (
    <div className="relative h-[600px] bg-cover bg-center border-amber-500/30 overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-indigo-950/30 backdrop-blur-[2px]"></div>
  
      <div className="h-full flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-2">
          <div className="bg-amber-400 h-2" style={{ width: `${(progress / chapters.length) * 100}%` }}></div>
        </div>
  
        <motion.div
          className="flex flex-col h-full justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Card className="absolute left-4 right-4 bg-indigo-950/80 border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/20 font-medieval text-lg">
            <CardHeader>
              <CardTitle className="font-medieval text-amber-300">{chapter?.title}</CardTitle>
              <CardDescription className="text-purple-200">{chapter?.description}</CardDescription>
            </CardHeader>
  
            {/* Character Dialogue */}
            <div className="p-4 bg-indigo-800 rounded-lg shadow-lg font-medieval text-lg">
              <p className="text-amber-300 font-semibold">{chapter?.dialogue}</p>
            </div>
  
            {/* Timer Display */}
            <div className="mt-4 left-4 text-amber-300 text-lg font-bold font-medieval text-lg">
              Time Remaining: {formatTime(timer)}
            </div>
  
            {/* Choices with Animated Buttons */}
            <div className="flex flex-col gap-4 mt-4">
              {chapter?.choices.map((choice, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="default"
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-purple-100 font-medieval text-lg"
                    onClick={() => handleChoice(choice.nextChapter)}
                  >
                    {choice.text}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
  
          {gameOutcome && (
            <motion.div
              className="absolute left-4 text-amber-300 font-semibold text-xl font-medieval text-lg"
              style={{ top: '350px' }} // Adjust this value to push it down
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3>{gameOutcome}</h3>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}