import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MysticMarket() {
  return (
    <div className="container mx-auto p-4">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Mystic Market</CardTitle>
          <CardDescription className="text-purple-200">Acquire powerful financial artifacts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200">In-game store and rewards coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

