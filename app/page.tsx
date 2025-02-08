import { WorldMap } from "@/components/world-map"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-8">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Welcome to FinanceQuest</CardTitle>
          <CardDescription className="text-purple-200">
            Embark on your magical journey to financial wisdom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 mb-4">Choose a realm to begin your adventure:</p>
          <WorldMap />
        </CardContent>
      </Card>
    </div>
  )
}

