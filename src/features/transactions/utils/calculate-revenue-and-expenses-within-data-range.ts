import Decimal from 'decimal.js'
import { TransactionFormProps } from '../schemas/transaction-schema'
import { format, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const calculateRevenueAndExpensesForDateRange = (
  data: TransactionFormProps[],
  dateRange: { from: Date; to: Date },
) => {
  const { from: startDate, to: endDate } = dateRange

  const monthsInRange = eachMonthOfInterval({ start: startDate, end: endDate })

  const revenueAndExpensesByMonth = monthsInRange.map((month) => {
    const firstDay = startOfMonth(month)
    const lastDay = endOfMonth(month)

    const monthName = format(month, 'MMM', { locale: ptBR })
    const capitalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase()

    const income = data
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date ?? '')
        return (
          transactionDate >= firstDay &&
          transactionDate <= lastDay &&
          !transaction.transaction
        )
      })
      .reduce(
        (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
        new Decimal(0),
      )

    const expenses = data
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date ?? '')
        return (
          transactionDate >= firstDay &&
          transactionDate <= lastDay &&
          transaction.transaction
        )
      })
      .reduce(
        (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
        new Decimal(0),
      )

    const revenue = income.minus(expenses)

    return {
      month: capitalizedMonthName,
      revenue: revenue.toNumber(),
      expenses: expenses.toNumber(),
    }
  })

  return revenueAndExpensesByMonth
}
