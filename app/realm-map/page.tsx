import { WorldMap } from "@/components/world-map"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function RealmMap() {
  return (
    <div className="space-y-8">
      <Card className="bg-indigo-950/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-medieval text-2xl text-amber-300">Financial Realm Map</CardTitle>
          <CardDescription className="text-purple-200">
            Choose a realm to begin your financial adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorldMap />
        </CardContent>
      </Card>
    </div>
  )
}

