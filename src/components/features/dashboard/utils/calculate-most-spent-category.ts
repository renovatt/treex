import { TransactionFormProps } from '@/schemas'

interface CategoryTotals {
  [category: string]: number
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
    const value = parseFloat(transaction.value) || 0
    const transactionDate = new Date(transaction.date ?? '')

    if (
      category !== 'Bônus/Entrada/Salário' &&
      (!currentMonthOnly ||
        (transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear))
    ) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0
      }

      categoryTotals[category] += value
    }
  })

  let mostSpentCategory = null
  let mostSpentTotal = 0

  for (const category in categoryTotals) {
    if (categoryTotals[category] > mostSpentTotal) {
      mostSpentCategory = category
      mostSpentTotal = categoryTotals[category]
    }
  }

  return {
    category: mostSpentCategory,
    total: mostSpentTotal,
  }
}
