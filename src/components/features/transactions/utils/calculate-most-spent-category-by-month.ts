import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

interface CategoryTotals {
  [category: string]: Decimal
}

export const calculateMostSpentCategoryByMonth = (
  data: TransactionFormProps[],
  selectedDateString?: string,
) => {
  const currentDate = new Date()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()

  if (selectedDateString) {
    const brlDate = selectedDateString.split('T')[0]
    const dateParts = brlDate.split('/')
    const selectedDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
    )

    currentMonth = selectedDate.getMonth()
    currentYear = selectedDate.getFullYear()
  }

  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = new Decimal(transaction.value || 0)
    const transactionDate = new Date(transaction.date || '')

    if (
      category !== 'Bônus/Entrada/Salário' &&
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
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
