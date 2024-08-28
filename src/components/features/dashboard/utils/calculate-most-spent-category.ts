import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

interface CategoryTotals {
  [category: string]: Decimal
}

export const calculateMostSpentCategory = (
  data: TransactionFormProps[],
  currentMonthOnly = false,
) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = new Decimal(transaction.value || 0)
    const transactionDate = new Date(transaction.date ?? '')

    if (
      category !== 'Bônus/Entrada/Salário' &&
      (!currentMonthOnly ||
        (transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear))
    ) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = new Decimal(0)
      }

      categoryTotals[category] = categoryTotals[category].plus(value)
    }
  })

  let mostSpentCategory: string | null = null
  let mostSpentTotal = new Decimal(0)

  for (const category in categoryTotals) {
    if (categoryTotals[category].greaterThan(mostSpentTotal)) {
      mostSpentCategory = category
      mostSpentTotal = categoryTotals[category]
    }
  }

  return {
    category: mostSpentCategory,
    total: mostSpentTotal.toNumber(),
  }
}
