import Decimal from 'decimal.js'
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { TransactionFormProps } from '../schemas/transaction-schema'

interface DateRange {
  from: Date
  to: Date
}

export const calculateCategoryPercentagesWithinDateRange = (
  data: TransactionFormProps[],
  dateRange: DateRange,
) => {
  const { from, to } = dateRange

  const normalizedFrom = startOfDay(from)
  const normalizedTo = endOfDay(to)

  const filteredData = data.filter((transaction) => {
    const transactionDate = new Date(transaction.date || '')
    return isWithinInterval(transactionDate, {
      start: normalizedFrom,
      end: normalizedTo,
    })
  })

  const totalIncome = filteredData
    .filter((transaction) => !transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const totalExpenses = filteredData
    .filter((transaction) => transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const totalTransactions = totalIncome.minus(totalExpenses)

  const categoryTotals: Record<string, Decimal> = {}

  filteredData.forEach((transaction) => {
    const category = transaction.category || 'Outros'
    const value = new Decimal(transaction.value || 0)

    if (!categoryTotals[category]) {
      categoryTotals[category] = new Decimal(0)
    }

    categoryTotals[category] = categoryTotals[category].plus(value)
  })

  const categoryPercentages = Object.keys(categoryTotals).map((category) => {
    const totalForCategory = categoryTotals[category]
    const percentage = totalTransactions.isZero()
      ? 0
      : totalForCategory.dividedBy(totalTransactions).times(100).toNumber()
    return {
      category,
      percentage: percentage.toFixed(2),
    }
  })

  return categoryPercentages
}
