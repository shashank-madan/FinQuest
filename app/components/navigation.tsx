import Link from "next/link"
import { Crown, ScrollText, ShoppingBag, User } from "lucide-react"

const navItems = [
  { href: "/realm-map", icon: ScrollText, label: "Realm Map" },
  { href: "/quest-log", icon: ScrollText, label: "Quest Log" },
  { href: "/mystic-market", icon: ShoppingBag, label: "Mystic Market" },
  { href: "/hero-profile", icon: User, label: "Hero Profile" },
  { href: "/life-quest", icon: Crown, label: "Life Quest" },
]

export function Navigation({ isOpen }: { isOpen: boolean }) {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 text-purple-100 p-3 rounded-lg hover:bg-purple-800/30 hover:border-purple-500/50 border border-transparent transition-all duration-300"
        >
          <item.icon className="h-5 w-5 text-purple-300" />
          {isOpen && <span className="font-medieval">{item.label}</span>}
        </Link>
      ))}
    </nav>
  )
}

