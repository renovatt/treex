import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'
import { incomeCategories } from '@/static/categories'

interface CategoryTotals {
  [category: string]: Decimal
}

export const calculateMostSpentCategory = (data: TransactionFormProps[]) => {
  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = new Decimal(transaction.value || 0)

    if (!incomeCategories.includes(category)) {
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
