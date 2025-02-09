"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CreditCardIcon, Home, Car, Smartphone, Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { calculateProgress, recalculateGoalProgress } from "./utils/financialCalculations"

// Types
interface PurchaseGoal {
  id: string
  title: string
  type: "Home" | "Car" | "Gadget" | "Other"
  targetAmount: number
  currentAmount: number
  years: number
  progress: number
  downPayment: number
  icon: string
  helping: string[]
  hurting: string[]
}

interface Transaction {
  id: string
  item: string
  amount: number
  category: string
  date: Date
}

interface CreditCard {
  id: string
  number: string
  name: string
  expiry: string
  cvv: string
}

interface UserFinancials {
  creditScore: number
  bankBalance: number
  linkedCards: CreditCard[]
}

// Mock Data
const mockGoals: PurchaseGoal[] = [
  {
    id: "1",
    title: "Dream House",
    type: "Home",
    targetAmount: 500000,
    currentAmount: 200000,
    years: 5,
    progress: 40,
    downPayment: 300000,
    icon: "Home",
    helping: ["Regular monthly savings", "Investment returns", "Bonus allocation"],
    hurting: ["High rental expenses", "Insurance premiums", "Fuel expenses"],
  },
  {
    id: "2",
    title: "Tesla Model 3",
    type: "Car",
    targetAmount: 60000,
    currentAmount: 45000,
    years: 2,
    progress: 100,
    downPayment: 15000,
    icon: "Car",
    helping: ["Consistent savings", "Side gig income", "Reduced expenses"],
    hurting: ["Nil"],
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    item: "Grocery Shopping",
    amount: 156.78,
    category: "Groceries",
    date: new Date("2025-02-08"),
  },
  {
    id: "2",
    item: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date("2025-02-07"),
  },
    {
    id: "3",
    item: "Movie Ticket",
    amount: 12.79,
    category: "Other",
    date: new Date("2025-02-06"),
  },
    {
    id: "4",
    item: "Fuel",
    amount: 45.99,
    category: "Transportation",
    date: new Date("2025-02-04"),
  },
    {
    id: "5",
    item: "Insurance Premium",
    amount: 150.29,
    category: "Other",
    date: new Date("2025-02-03"),
  },
    {
    id: "5",
    item: "Monthly Rental",
    amount: 1050.75,
    category: "Other",
    date: new Date("2025-02-02"),
  },
]

const mockFinancials: UserFinancials = {
  creditScore: 750,
  bankBalance: 25000,
  linkedCards: [
    {
      id: "1",
      number: "4532123456789012",
      name: "John Doe",
      expiry: "12/25",
      cvv: "123",
    },
  ],
}

// Icons mapping
const icons = {
  Home,
  Car,
  Gadget: Smartphone,
  Other: Package,
}

// Form Schemas
const goalFormSchema = z.object({
  type: z.enum(["Home", "Car", "Gadget", "Other"]),
  cost: z.string().min(1),
  years: z.string().min(1),
  title: z.string().min(1),
})

const cardFormSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  name: z.string().min(1),
  expiry: z.string().min(5).max(5),
  cvv: z.string().min(3).max(4),
})

const expenseFormSchema = z.object({
  item: z.string().min(1),
  amount: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
})

export default function FinanceDashboard() {
  const [goals, setGoals] = useState<PurchaseGoal[]>(mockGoals)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [financials, setFinancials] = useState<UserFinancials>(mockFinancials)

  useEffect(() => {
    // Recalculate all goals whenever financials or transactions change
    const recentExpenses = transactions.slice(0, 5).reduce((sum, t) => sum + t.amount, 0)
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        recalculateGoalProgress(goal, financials.creditScore, financials.bankBalance, recentExpenses),
      ),
    )
  }, [financials, transactions])

  // Goal Card Component
  function GoalCard({ goal }: { goal: PurchaseGoal }) {
    const [isOpen, setIsOpen] = useState(false)
    const IconComponent = icons[goal.type as keyof typeof icons]

    return (
      <>
        <div
          className="p-6 rounded-lg bg-[#2D2A5D] cursor-pointer hover:bg-[#353275] transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-full bg-[#FFD700]/10">
              <IconComponent className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FFD700]">{goal.title}</h3>
              <p className="text-purple-200">Target: ${goal.targetAmount.toLocaleString()}</p>
            </div>
          </div>
          <Progress value={goal.progress} className="h-2 bg-purple-950" />
          <p className="mt-2 text-sm text-purple-200">Progress: {goal.progress}%</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-[#1E1B4B] text-purple-100 border-purple-800">
            <DialogHeader>
              <DialogTitle className="text-[#FFD700] text-2xl">{goal.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div>
                <h4 className="text-[#FFD700] mb-2">What's Helping</h4>
                <ul className="space-y-2">
                  {goal.helping.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[#FFD700] mb-2">What's Hurting</h4>
                <ul className="space-y-2">
                  {goal.hurting.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Add Goal Form Component
  function AddGoalForm() {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof goalFormSchema>>({
      resolver: zodResolver(goalFormSchema),
      defaultValues: {
        type: "Home",
        cost: "",
        years: "",
        title: "",
      },
    })

    function onSubmit(values: z.infer<typeof goalFormSchema>) {
      const cost = Number.parseFloat(values.cost)
      const recentExpenses = transactions.slice(0, 5).reduce((sum, t) => sum + t.amount, 0)
      const { progress, downPayment } = calculateProgress(
        cost,
        financials.creditScore,
        financials.bankBalance,
        recentExpenses,
      )

      const newGoal: PurchaseGoal = {
        id: Math.random().toString(),
        title: values.title,
        type: values.type,
        targetAmount: cost,
        currentAmount: (progress / 100) * cost,
        years: Number.parseInt(values.years),
        progress,
        downPayment,
        icon: values.type,
        helping: ["New goal added"],
        hurting: ["Initial progress based on current finances"],
      }
      setGoals([...goals, newGoal])
      setOpen(false)
      form.reset()
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#2D2A5D] text-[#FFD700] border-purple-700 hover:bg-[#353275] hover:text-[#FFD700]"
          >
            Add Purchase Goal
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E1B4B] text-purple-100 border-purple-800">
          <DialogHeader>
            <DialogTitle className="text-[#FFD700]">Add New Purchase Goal</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">What would you like to buy?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#2D2A5D] border-purple-700 font-medieval">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#2D2A5D] border-purple-700 font-medieval">
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Car">Car</SelectItem>
                        <SelectItem value="Gadget">Gadget / Appliance</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">What is the cost of purchase?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount in $"
                        type="number"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">In how many years do you want to make the purchase?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter number of years"
                        type="number"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Give a title for the purchase</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#FFD700] text-[#1E1B4B] hover:bg-[#FFD700]/90 font-medieval">
                Add Goal
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }

  // Link Card Form Component
  function LinkCardForm() {
    const [open, setOpenCard] = useState(false)
    const form = useForm<z.infer<typeof cardFormSchema>>({
      resolver: zodResolver(cardFormSchema),
      defaultValues: {
        cardNumber: "",
        name: "",
        expiry: "",
        cvv: "",
      },
    })

    function onSubmit(values: z.infer<typeof cardFormSchema>) {
      const newCard = {
        id: Math.random().toString(),
        number: values.cardNumber,
        name: values.name,
        expiry: values.expiry,
        cvv: values.cvv,
      }
      setFinancials({
        ...financials,
        linkedCards: [...financials.linkedCards, newCard],
      })
      setOpenCard(false)
      form.reset()
    }

    return (
      <Dialog open={open} onOpenChange={setOpenCard}>
        <DialogTrigger asChild>
          <Button className="bg-[#FFD700] text-[#1E1B4B] hover:bg-[#FFD700]/90 font-medieval">Link New Card</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E1B4B] text-purple-100 border-purple-800 font-medieval">
          <DialogHeader>
            <DialogTitle className="text-[#FFD700] font-medieval">Link New Card</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="bg-[#2D2A5D] border-purple-700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medieval">Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          className="bg-[#2D2A5D] border-purple-700 font-medieval"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medieval">CVV</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          type="password"
                          className="bg-[#2D2A5D] border-purple-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-[#FFD700] text-[#1E1B4B] hover:bg-[#FFD700]/90 font-medieval">
                Link Card
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }

  // Add Expense Form Component
  function AddExpenseForm() {
    const [open, setOpenExpense] = useState(false)
    const form = useForm<z.infer<typeof expenseFormSchema>>({
      resolver: zodResolver(expenseFormSchema),
      defaultValues: {
        item: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0], // Set default date to today
      },
    })

    function onSubmit(values: z.infer<typeof expenseFormSchema>) {
      const newExpense = {
        id: Math.random().toString(),
        item: values.item,
        amount: Number.parseFloat(values.amount),
        category: values.category,
        date: new Date(values.date),
      }
      setTransactions([newExpense, ...transactions])
      setFinancials((prev) => ({
        ...prev,
        bankBalance: prev.bankBalance - newExpense.amount,
      }))
      setOpenExpense(false)
      form.reset()
    }

    return (
      <Dialog open={open} onOpenChange={setOpenExpense}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#2D2A5D] text-[#FFD700] border-purple-700 hover:bg-[#353275] hover:text-[#FFD700]"
          >
            Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E1B4B] text-purple-100 border-purple-800">
          <DialogHeader>
            <DialogTitle className="text-[#FFD700]">Add Manual Expense</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Item Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter item name"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="bg-[#2D2A5D] border-purple-700 font-medieval"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#2D2A5D] border-purple-700 font-medieval">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#2D2A5D] border-purple-700 font-medieval">
                        <SelectItem value="Groceries">Groceries</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medieval">Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-[#2D2A5D] border-purple-700 font-medieval" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#FFD700] text-[#1E1B4B] hover:bg-[#FFD700]/90 font-medieval">
                Add Expense
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }

  function generateFinancialAdvice() {
    const creditScore = financials.creditScore
    const recentPurchases = transactions.slice(0, 5)

    let advice = ""
    if (creditScore < 600) {
      advice += "Your credit score is low. Consider paying off existing debts and avoiding new credit applications. "
    } else if (creditScore < 700) {
      advice += "Your credit score is fair. Keep making timely payments to improve it further. "
    } else {
      advice += "Your credit score is good. Keep up the great work! "
    }

    const totalRecentSpending = recentPurchases.reduce((sum, transaction) => sum + transaction.amount, 0)
    if (totalRecentSpending > financials.bankBalance * 0.5) {
      advice +=
        "Your recent spending is high relative to your bank balance. Consider cutting back on non-essential expenses. "
    } else {
      advice += "Your recent spending seems reasonable compared to your bank balance. "
    }

    return advice
  }

  return (
    <div className="font-medieval text-purple-100">
      <header className="border-b border-purple-500/20 bg-indigo-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-purple-200">Credit Score:</span>
                <span className="font-semibold text-amber-300">{financials.creditScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-200">Balance:</span>
                <span className="font-semibold text-amber-300">${financials.bankBalance.toLocaleString()}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-purple-800/40 text-purple-200 border-purple-500/20 hover:bg-purple-800/60"
                  >
                    <CreditCardIcon className="w-4 h-4 mr-2" />
                    {financials.linkedCards.length} Cards Linked
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-purple-800/40 border-purple-500/20">
                  {financials.linkedCards.map((card) => (
                    <DropdownMenuItem key={card.id} className="text-purple-200">
                      Card ending in {card.number.slice(-4)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-4">
              <AddGoalForm />
              <AddExpenseForm />
              <LinkCardForm />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-amber-300">Purchase Quests</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-amber-300">Financial Advice</h2>
            <p className="text-purple-200 bg-purple-800/40 p-4 rounded-lg">{generateFinancialAdvice()}</p>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-amber-300">Recent Transactions</h2>
            </div>
            <div className="rounded-lg border border-purple-500/20 bg-purple-800/40">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-purple-800/60 border-purple-500/20">
                    <TableHead className="text-amber-300">Item</TableHead>
                    <TableHead className="text-amber-300">Amount</TableHead>
                    <TableHead className="text-amber-300">Category</TableHead>
                    <TableHead className="text-amber-300">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-purple-800/60 border-purple-500/20">
                      <TableCell className="text-purple-100">{transaction.item}</TableCell>
                      <TableCell className="text-purple-100">${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-purple-100">{transaction.category}</TableCell>
                      <TableCell className="text-purple-100">{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

