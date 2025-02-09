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

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { useToast } from "@/components/ui/use-toast";
// import Link from "next/link";

// const scenarios = [
//   {
//     name: "Stock Market Surge",
//     idealRisk: 70,
//     idealReward: 85,
//     story: "A booming stock market presents an opportunity. Will you go all in or play it safe?",
//   },
//   {
//     name: "Real Estate Investment",
//     idealRisk: 40,
//     idealReward: 60,
//     story: "Property values are rising. Should you buy in or wait for a correction?",
//   }
// ];

// export function RiskManagementGame() {
//   const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
//   const [riskLevel, setRiskLevel] = useState(50);
//   const [rewardLevel, setRewardLevel] = useState(50);
//   const [score, setScore] = useState(0);
//   const [round, setRound] = useState(1);
//   const [gameOver, setGameOver] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (round <= scenarios.length) {
//       setCurrentScenario(scenarios[round - 1]);
//       setRiskLevel(50);
//       setRewardLevel(50);
//     } else {
//       endGame();
//     }
//   }, [round]);

//   const handleSubmit = () => {
//     const riskDiff = Math.abs(riskLevel - currentScenario.idealRisk);
//     const rewardDiff = Math.abs(rewardLevel - currentScenario.idealReward);
//     const totalDiff = riskDiff + rewardDiff;

//     let points = totalDiff <= 10 ? 3 : totalDiff <= 20 ? 2 : totalDiff <= 30 ? 1 : 0;
//     setScore(score + points);
//     toast({
//       title: `You earned ${points} points!`,
//       description: `Scenario: ${currentScenario.name}\n${currentScenario.story}`,
//       variant: points > 0 ? "default" : "destructive",
//     });

//     setRound(round + 1);
//   };

//   const endGame = () => {
//     setGameOver(true);
//     toast({
//       title: "Game Over!",
//       description: `Your final score is ${score} out of ${scenarios.length * 3}.`,
//     });
//   };

//   return (
//     <Card className="bg-gray-900 border-yellow-500">
//       <CardHeader>
//         <CardTitle className="text-2xl text-yellow-300">Financial Risk Management</CardTitle>
//         <CardDescription className="text-gray-300">
//           Make strategic financial decisions balancing risk and reward.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {!gameOver ? (
//           <>
//             <p className="text-lg text-center text-gray-200">Round {round}/{scenarios.length}</p>
//             <p className="text-xl text-center text-yellow-300">{currentScenario.name}</p>
//             <p className="text-gray-300 text-center italic">{currentScenario.story}</p>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-300">Risk Level: {riskLevel}</p>
//                 <Slider value={[riskLevel]} onValueChange={(value) => setRiskLevel(value[0])} max={100} step={1} />
//               </div>
//               <div>
//                 <p className="text-gray-300">Reward Level: {rewardLevel}</p>
//                 <Slider value={[rewardLevel]} onValueChange={(value) => setRewardLevel(value[0])} max={100} step={1} />
//               </div>
//             </div>
//             <Button onClick={handleSubmit} className="w-full">Submit Decision</Button>
//           </>
//         ) : (
//           <p className="text-xl text-center text-yellow-300">Game Over! Your final score: {score}/{scenarios.length * 3}</p>
//         )}
//         <p className="text-lg text-center text-gray-200">Score: {score}</p>
//       </CardContent>
//       <CardFooter className="justify-between">
//         <Button asChild variant="ghost">
//           <Link href="/">Return to Dashboard</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import Link from "next/link";

// // Define the Choice type
// type Choice = {
//   text: string;
//   risk: number;
//   reward: number;
// };

// const scenarios = [
//   {
//     name: "The Merchant's Dilemma",
//     choices: [
//       { text: "Invest in silk trade", risk: 70, reward: 85 },
//       { text: "Open a local shop", risk: 30, reward: 50 }
//     ],
//     story: "A caravan offers exotic silks at a discount, but the journey to the market is fraught with danger. What do you do?",
//   },
//   {
//     name: "The King's Offer",
//     choices: [
//       { text: "Lend gold to the kingdom", risk: 40, reward: 70 },
//       { text: "Refuse and invest elsewhere", risk: 20, reward: 40 }
//     ],
//     story: "The king seeks a loan for his army, promising a high return but with political uncertainty. Will you take the risk?",
//   }
// ];

// export function StoryAdventureGame() {
//   const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
//   const [score, setScore] = useState(0);
//   const [round, setRound] = useState(1);
//   const [gameOver, setGameOver] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (round <= scenarios.length) {
//       setCurrentScenario(scenarios[round - 1]);
//     } else {
//       endGame();
//     }
//   }, [round]);

//   const handleChoice = (choice: Choice) => {
//     setScore(score + Math.floor((choice.reward - choice.risk) / 10));
//     toast({
//       title: `You chose: ${choice.text}`,
//       description: `Risk: ${choice.risk}, Reward: ${choice.reward}`,
//     });
//     setRound(round + 1);
//   };

//   const endGame = () => {
//     setGameOver(true);
//     toast({
//       title: "Game Over!",
//       description: `Your final score is ${score} out of ${scenarios.length * 10}.`,
//     });
//   };

//   return (
//     <Card className="bg-gray-900 border-yellow-500">
//       <CardHeader>
//         <CardTitle className="text-2xl text-yellow-300">Story Adventure Game</CardTitle>
//         <CardDescription className="text-gray-300">
//           Make strategic decisions and see how your story unfolds.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {!gameOver ? (
//           <>
//             <p className="text-lg text-center text-gray-200">Round {round}/{scenarios.length}</p>
//             <p className="text-xl text-center text-yellow-300">{currentScenario.name}</p>
//             <p className="text-gray-300 text-center italic">{currentScenario.story}</p>
//             <div className="space-y-4">
//               {currentScenario.choices.map((choice, index) => (
//                 <Button key={index} onClick={() => handleChoice(choice)} className="w-full">
//                   {choice.text}
//                 </Button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p className="text-xl text-center text-yellow-300">Game Over! Your final score: {score}/{scenarios.length * 10}</p>
//         )}
//         <p className="text-lg text-center text-gray-200">Score: {score}</p>
//       </CardContent>
//       <CardFooter className="justify-between">
//         <Button asChild variant="ghost">
//           <Link href="/">Return to Dashboard</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }