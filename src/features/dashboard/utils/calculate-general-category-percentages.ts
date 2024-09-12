import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'

export const calculateGeneralCategoryPercentages = (
  data: TransactionFormProps[],
) => {
  const totalIncome = data
    .filter((transaction) => !transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const totalExpenses = data
    .filter((transaction) => transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const overallTotal = totalIncome.minus(totalExpenses)

  const categoryTotals: Record<string, Decimal> = {}

  data.forEach((transaction) => {
    const category = transaction.category || 'Outros'
    const value = new Decimal(transaction.value || 0)

    if (!categoryTotals[category]) {
      categoryTotals[category] = new Decimal(0)
    }

    categoryTotals[category] = categoryTotals[category].plus(value)
  })

  const categoryPercentages = Object.keys(categoryTotals).map((category) => {
    const totalForCategory = categoryTotals[category]
    const percentage = totalForCategory
      .dividedBy(overallTotal.abs())
      .times(100)
      .toNumber()
    return {
      category,
      percentage: percentage.toFixed(2),
    }
  })

  return categoryPercentages
}
