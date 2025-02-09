"use client"

import { useState, useEffect } from "react"
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

// Map of promo codes to descriptions
const promoDescriptions: { [key: string]: string } = {
  "MYSTIC10": "Save 10% on your next purchase at Macy's with this exclusive discount code.",
  "SPELL20": "Enjoy 20% off your order at Target with this limited-time promo code.                 ",
  "FORTUNE50": "Get 50% off select items at Best Buy for a limited time with this special offer.",
  "LUCKYCHARM": "Use this code at Amazon to get 15% off your next purchase, no minimum required.",
  "GOLDENRUNES": "Unlock 10% off your favorite items at Walmart with this golden opportunity.",
  "ARCANEBOOST": "Boost your savings by 15% on select products at Home Depot with this promo code.",
  "DARKORB": "Get an extra 20% off select items at Bed Bath & Beyond with this exclusive discount code.",
  "CELESTIALKEY": "Save 10% on celestial-themed products at Etsy with this special code.",
  "PHANTOMBLAZE": "Enjoy 25% off select items at Sephora with this time-sensitive promo code.",
  "SHADOWVEIL": "Take 15% off your purchase at Nordstrom with this code, valid for a limited time only."
};

export default function MysticMarket() {
  const [coins, setCoins] = useState<number>(0)
  const [ownedCodes, setOwnedCodes] = useState<string[]>([])

  // Load coins and owned codes from localStorage when component mounts
  useEffect(() => {
    const storedCoins = Number.parseInt(localStorage.getItem("userCoins") || "0", 10)
    setCoins(storedCoins)

    const storedCodes = JSON.parse(localStorage.getItem("ownedPromoCodes") || "[]")
    setOwnedCodes(storedCodes)
  }, [])

  const buyPromoCode = (promo: PromoCode) => {
    if (coins >= promo.price) {
      const newTotalCoins = coins - promo.price
      const updatedOwnedCodes = [...ownedCodes, promo.code]

      setCoins(newTotalCoins)
      setOwnedCodes(updatedOwnedCodes)

      localStorage.setItem("userCoins", newTotalCoins.toString())
      localStorage.setItem("ownedPromoCodes", JSON.stringify(updatedOwnedCodes))

      window.dispatchEvent(new Event("coinsUpdated"))
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
          <h2 className="text-lg text-amber-300 mt-4">Available Promo Codes</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {promoCodes.map((promo) => (
              <div key={promo.id} className="flex flex-col items-center bg-purple-800/40 p-3 rounded-lg">
                <span className="text-purple-200 font-bold text-lg">
                  {ownedCodes.includes(promo.code) ? promo.code : "******"}
                </span>
                <p className="text-purple-300">{promo.price} coins</p>
                <p className="text-purple-300">{promoDescriptions[promo.code]}</p> {/* Display Description */}
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
              <h2 className="text-lg text-amber-300 mt-6 font-medieval text-lg">Your Purchased Codes</h2>
              <ul className="text-purple-200 mt-2 space-y-1 font-medieval text-lg">
                {ownedCodes.map((code, index) => (
                  <li key={index}>✅ {code}</li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}