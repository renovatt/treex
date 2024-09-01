import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { incomeCategories } from '@/static/categories'

interface CategoryTotals {
  [category: string]: Decimal
}

interface DateRange {
  from: Date
  to: Date
}

export const calculateMostSpentCategoryWithinDateRange = (
  data: TransactionFormProps[],
  dateRange: DateRange,
) => {
  const { from, to } = dateRange

  const normalizedFrom = startOfDay(from)
  const normalizedTo = endOfDay(to)

  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = new Decimal(transaction.value || 0)
    const transactionDate = new Date(transaction.date || '')

    if (
      !incomeCategories.includes(category) &&
      isWithinInterval(transactionDate, {
        start: normalizedFrom,
        end: normalizedTo,
      })
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
