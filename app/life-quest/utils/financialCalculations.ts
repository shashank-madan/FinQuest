interface PurchaseGoal {
  targetAmount: number
  progress: number
  downPayment: number
  currentAmount: number
}

export function calculateLoanEligibility(creditScore: number, cost: number): number {
  let maxPercentage = 0
  if (creditScore >= 800) maxPercentage = 0.95
  else if (creditScore >= 740) maxPercentage = 0.9
  else if (creditScore >= 670) maxPercentage = 0.8
  else if (creditScore >= 580) maxPercentage = 0.5
  else maxPercentage = 0.2 // Even with a low credit score, assume some loan eligibility

  return cost * maxPercentage
}

export function calculateDownPayment(cost: number, loanEligibility: number): number {
  return Math.max(cost - loanEligibility, 0)
}

export function calculateProgress(
  cost: number,
  creditScore: number,
  balance: number,
  recentExpenses: number,
): { progress: number; downPayment: number } {
  const loanEligibility = calculateLoanEligibility(creditScore, cost)
  const downPayment = calculateDownPayment(cost, loanEligibility)
  const availableFunds = Math.max(balance - recentExpenses, 0)

  // Calculate progress as a percentage of the down payment saved
  let progressPercentage = (availableFunds / downPayment) * 100

  // Cap progress at 100%
  progressPercentage = Math.min(progressPercentage, 100)

  // If the cost is very low compared to available funds, adjust progress accordingly
  if (cost < availableFunds) {
    progressPercentage = 100
  }

  return {
    progress: Math.round(progressPercentage),
    downPayment,
  }
}

export function recalculateGoalProgress(
  goal: PurchaseGoal,
  creditScore: number,
  balance: number,
  recentExpenses: number,
): PurchaseGoal {
  const { progress, downPayment } = calculateProgress(goal.targetAmount, creditScore, balance, recentExpenses)

  return {
    ...goal,
    progress,
    downPayment,
    currentAmount: (progress / 100) * goal.targetAmount,
  }
}

