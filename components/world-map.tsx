"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

const modules = [
  {
    id: "crystal-credit-kingdom",
    title: "Crystal Credit Kingdom",
    description: "Master the mystical arts of credit scoring",
    position: "top-1/4 left-1/4",
    completed: false,
    icon: "🏰",
  },
  {
    id: "treasury-temple",
    title: "Treasury Temple",
    description: "Unlock the secrets of taxation",
    position: "top-1/3 right-1/3",
    completed: false,
    icon: "⛪",
  },
  {
    id: "fraudfall-the-guardians-of-trust",
    title: "Fraudfall: The Guardians of Trust",
    description: "Master the mystical arts of credit scoring",
    position: "top-1/4 left-1/2",
    completed: false,
    icon: "🕵️",
  },
  {
    id: "risk-ruins",
    title: "Risk Ruins",
    description: "Navigate the ancient paths of risk management",
    position: "bottom-1/3 left-1/3",
    completed: false,
    icon: "🗿",
  },
  {
    id: "asset-arcadia",
    title: "Asset Arcadia",
    description: "Channel the powers of asset allocation",
    position: "bottom-1/4 right-1/3",
    completed: false,
    icon: "🏛️",
  },
  {
    id: "market-mystic-mountains",
    title: "Market Mystic Mountains",
    description: "Seek wisdom in the peaks of market trends",
    position: "top-1/2 left-1/2",
    completed: false,
    icon: "⛰️",
  },
]

export function WorldMap() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  return (
    <Card className="relative h-[600px] bg-[url('/Fantasy_Map.jpg')] bg-cover bg-center border-amber-500/30 ">
      <div className="absolute inset-0 bg-indigo-950/30"></div>
      <CardContent className="h-full relative">
        {/* Magical connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path
            d="M200,150 L400,200 L300,300 L500,350 L350,250"
            className="stroke-amber-400/50 stroke-2 fill-none"
            filter="url(#glow)"
          />
        </svg>

        {modules.map((module) => (
          <div key={module.id} className={cn("absolute", module.position)}>
            <Link href={`/realm-map/${module.id}`}>
              <Button
                variant={module.completed ? "default" : "secondary"}
                className={cn(
                  "w-16 h-16 rounded-full font-medieval text-lg relative group transition-all duration-300",
    "bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white"
                )}
                onClick={() => setSelectedModule(module.id)}
              >
                <span className="text-2xl">{module.icon}</span>
                <div className="absolute -inset-1 bg-amber-400/20 rounded-full animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>
          </div>
        ))}

        {selectedModule && (
          <Card className="absolute bottom-4 left-4 right-4 bg-indigo-950/80 border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/20">
            <CardHeader>
              <CardTitle className="font-medieval text-amber-300">
                {modules.find((m) => m.id === selectedModule)?.title}
              </CardTitle>
              <CardDescription className="text-purple-200">
                {modules.find((m) => m.id === selectedModule)?.description}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

