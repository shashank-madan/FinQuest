"use client"

import { Inter, MedievalSharp } from "next/font/google"
import "./globals.css"
import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "./components/navigation"
import { Coins, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const medieval = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-medieval",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [userCoins, setUserCoins] = useState(0)

  useEffect(() => {
    const updateCoins = () => {
      const savedCoins = localStorage.getItem("userCoins")
      if (savedCoins) {
        setUserCoins(Number.parseInt(savedCoins, 10))
      }
    }

    updateCoins()
    window.addEventListener("storage", updateCoins)
    window.addEventListener("coinsUpdated", updateCoins)

    return () => {
      window.removeEventListener("storage", updateCoins)
      window.removeEventListener("coinsUpdated", updateCoins)
    }
  }, [])

  return (
    <html lang="en">
      <body className={`${inter.className} ${medieval.variable}`}>
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 relative overflow-hidden">
          {/* Magical particles effect */}
          <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 animate-twinkle"></div>
          <div className="flex">
            {/* Left Sidebar */}
            <aside
              className={`${isNavOpen ? "w-64" : "w-20"} bg-indigo-950/50 backdrop-blur-sm border-r border-purple-500/20 p-4 flex flex-col gap-2 min-h-screen transition-all duration-300`}
            >
              <div className="flex items-center gap-2 mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative">
                    <Coins className="h-8 w-8 text-amber-400" />
                    <div className="absolute inset-0 animate-pulse-glow"></div>
                  </div>
                  {isNavOpen && <h1 className="text-2xl font-medieval text-amber-300">FinanceQuest</h1>}
                </Link>
              </div>
              <Navigation isOpen={isNavOpen} />
              <Button variant="ghost" className="mt-auto self-end" onClick={() => setIsNavOpen(!isNavOpen)}>
                {isNavOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Coins className="h-5 w-5 text-amber-900" />
                  </div>
                  <span className="text-amber-300 font-medieval">{userCoins}</span>
                </div>
                <h1 className="text-2xl font-medieval text-amber-300">Welcome, Sir Goldsworth </h1>
              </div>
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

