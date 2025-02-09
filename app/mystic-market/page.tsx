// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function MysticMarket() {
//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
//           <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-purple-200">In-game store and rewards coming soon...</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// type PromoCode = {
//   id: number
//   code: string
//   price: number
// }

// const promoCodes: PromoCode[] = [
//   { id: 1, code: "MYSTIC10", price: 500 },
//   { id: 2, code: "SPELL20", price: 1000 },
//   { id: 3, code: "FORTUNE50", price: 2500 },
// ]

// export default function MysticMarket() {
//   const [coins, setCoins] = useState(1200)
//   const [ownedCodes, setOwnedCodes] = useState<string[]>([])

//   const buyPromoCode = (promo: PromoCode) => {
//     if (coins >= promo.price) {
//       setCoins(coins - promo.price)
//       setOwnedCodes([...ownedCodes, promo.code])
//     } else {
//       alert("Not enough coins!")
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
//           <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-purple-200 text-lg">
//             <strong className="text-amber-300">Your Coins:</strong> {coins}
//           </p>

//           <h2 className="text-lg text-amber-300 mt-4">Available Promo Codes</h2>
//           <div className="space-y-2 mt-2">
//             {promoCodes.map((promo) => (
//               <div key={promo.id} className="flex justify-between items-center bg-purple-800/40 p-2 rounded-lg">
//                 <span className="text-purple-200">
//                   <strong>{promo.code}</strong> - {promo.price} coins
//                 </span>
//                 <Button
//                   className="bg-amber-500 hover:bg-amber-600 text-black"
//                   onClick={() => buyPromoCode(promo)}
//                   disabled={ownedCodes.includes(promo.code)}
//                 >
//                   {ownedCodes.includes(promo.code) ? "Owned" : "Buy"}
//                 </Button>
//               </div>
//             ))}
//           </div>

//           {ownedCodes.length > 0 && (
//             <>
//               <h2 className="text-lg text-amber-300 mt-4">Your Purchased Codes</h2>
//               <ul className="text-purple-200">
//                 {ownedCodes.map((code, index) => (
//                   <li key={index}>✅ {code}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// type PromoCode = {
//   id: number
//   code: string
//   price: number
// }

// const promoCodes: PromoCode[] = [
//   { id: 1, code: "MYSTIC10", price: 500 },
//   { id: 2, code: "SPELL20", price: 1000 },
//   { id: 3, code: "FORTUNE50", price: 2500 },
// ]

// export default function MysticMarket() {
//   const [coins, setCoins] = useState(1200)
//   const [ownedCodes, setOwnedCodes] = useState<string[]>([])

//   const buyPromoCode = (promo: PromoCode) => {
//     if (coins >= promo.price) {
//       setCoins(coins - promo.price)
//       setOwnedCodes([...ownedCodes, promo.code])
//     } else {
//       alert("Not enough coins!")
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
//           <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-purple-200 text-lg">
//             <strong className="text-amber-300">Your Coins:</strong> {coins}
//           </p>

//           <h2 className="text-lg text-amber-300 mt-4">Available Promo Codes</h2>
//           <div className="space-y-2 mt-2">
//             {promoCodes.map((promo) => (
//               <div key={promo.id} className="flex justify-between items-center bg-purple-800/40 p-2 rounded-lg">
//                 <span className="text-purple-200">
//                   <strong>{promo.code}</strong> - {promo.price} coins
//                 </span>
//                 <Button
//                   className="bg-amber-500 hover:bg-amber-600 text-black"
//                   onClick={() => buyPromoCode(promo)}
//                   disabled={ownedCodes.includes(promo.code)}
//                 >
//                   {ownedCodes.includes(promo.code) ? "Owned" : "Buy"}
//                 </Button>
//               </div>
//             ))}
//           </div>

//           {ownedCodes.length > 0 && (
//             <>
//               <h2 className="text-lg text-amber-300 mt-4">Your Purchased Codes</h2>
//               <ul className="text-purple-200">
//                 {ownedCodes.map((code, index) => (
//                   <li key={index}>✅ {code}</li>
//                 ))}
//               </ul>
//             </>
//           )}

//           {/* Progress bars section */}
//           <div className="flex space-x-4 mt-6">
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 1</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
//               </div>
//             </div>
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 2</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
//               </div>
//             </div>
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 3</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PromoCode = {
  id: number
  code: string
  price: number
}

const promoCodes: PromoCode[] = [
  { id: 1, code: "MYSTIC10", price: 500 },
  { id: 2, code: "SPELL20", price: 1000 },
  { id: 3, code: "FORTUNE50", price: 2500 },
  { id: 4, code: "LUCKYCHARM", price: 750 },
  { id: 5, code: "GOLDENRUNES", price: 1800 },
  { id: 6, code: "ARCANEBOOST", price: 2200 },
  { id: 7, code: "DARKORB", price: 900 },
  { id: 8, code: "CELESTIALKEY", price: 3000 },
  { id: 9, code: "PHANTOMBLAZE", price: 4000 },
  { id: 10, code: "SHADOWVEIL", price: 1200 },
]

export default function MysticMarket() {
  const [coins, setCoins] = useState(1200)
  const [ownedCodes, setOwnedCodes] = useState<string[]>([])

  const buyPromoCode = (promo: PromoCode) => {
    if (coins >= promo.price) {
      setCoins(coins - promo.price)
      setOwnedCodes([...ownedCodes, promo.code])
    } else {
      alert("Not enough coins!")
    }
  }

  return (
    <div className="font-medieval">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
          <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 text-lg">
            <strong className="text-amber-300">Your Coins:</strong> {coins}
          </p>

          <h2 className="text-lg text-amber-300 mt-4">Available Promo Codes</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {promoCodes.map((promo) => (
              <div key={promo.id} className="flex flex-col items-center bg-purple-800/40 p-3 rounded-lg">
                <span className="text-purple-200 font-bold text-lg">
                  {ownedCodes.includes(promo.code) ? promo.code : "******"}
                </span>
                <p className="text-purple-300">{promo.price} coins</p>
                <Button
                  className="mt-2 bg-amber-500 hover:bg-amber-600 text-black w-full"
                  onClick={() => buyPromoCode(promo)}
                  disabled={ownedCodes.includes(promo.code)}
                >
                  {ownedCodes.includes(promo.code) ? "Owned" : "Buy"}
                </Button>
              </div>
            ))}
          </div>

          {ownedCodes.length > 0 && (
            <>
              <h2 className="text-lg text-amber-300 mt-6">Your Purchased Codes</h2>
              <ul className="text-purple-200 mt-2 space-y-1">
                {ownedCodes.map((code, index) => (
                  <li key={index}>✅ {code}</li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// type PromoCode = {
//   id: number
//   code: string
//   price: number
// }

// const promoCodes: PromoCode[] = [
//   { id: 1, code: "MYSTIC10", price: 500 },
//   { id: 2, code: "SPELL20", price: 1000 },
//   { id: 3, code: "FORTUNE50", price: 2500 },
// ]

// export default function MysticMarket() {
//   const [coins, setCoins] = useState(1200)
//   const [ownedCodes, setOwnedCodes] = useState<string[]>([])

//   const buyPromoCode = (promo: PromoCode) => {
//     if (coins >= promo.price) {
//       setCoins(coins - promo.price)
//       setOwnedCodes([...ownedCodes, promo.code])
//     } else {
//       alert("Not enough coins!")
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
//         <CardHeader>
//           <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
//           <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-purple-200 text-lg">
//             <strong className="text-amber-300">Your Coins:</strong> {coins}
//           </p>

//           <h2 className="text-lg text-amber-300 mt-4">Available Promo Codes</h2>
//           <div className="space-y-2 mt-2">
//             {promoCodes.map((promo) => (
//               <div key={promo.id} className="flex justify-between items-center bg-purple-800/40 p-2 rounded-lg">
//                 <span className="text-purple-200">
//                   <strong>{promo.code}</strong> - {promo.price} coins
//                 </span>
//                 <Button
//                   className="bg-amber-500 hover:bg-amber-600 text-black"
//                   onClick={() => buyPromoCode(promo)}
//                   disabled={ownedCodes.includes(promo.code)}
//                 >
//                   {ownedCodes.includes(promo.code) ? "Owned" : "Buy"}
//                 </Button>
//               </div>
//             ))}
//           </div>

//           {ownedCodes.length > 0 && (
//             <>
//               <h2 className="text-lg text-amber-300 mt-4">Your Purchased Codes</h2>
//               <ul className="text-purple-200">
//                 {ownedCodes.map((code, index) => (
//                   <li key={index}>✅ {code}</li>
//                 ))}
//               </ul>
//             </>
//           )}

//           {/* Progress bars section */}
//           <div className="flex space-x-4 mt-6">
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 1</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
//               </div>
//             </div>
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 2</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
//               </div>
//             </div>
//             <div className="w-1/3">
//               <span className="text-amber-300">Progress 3</span>
//               <div className="w-full bg-gray-300 rounded-full h-2">
//                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
