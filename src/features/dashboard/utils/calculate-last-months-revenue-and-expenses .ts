import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const calculateLastMonthsRevenueAndExpenses = (
  data: TransactionFormProps[],
  qnt: number = 11,
) => {
  const currentDate = new Date()
  const lastMonths = []

  for (let i = qnt; i >= 0; i--) {
    const month = subMonths(currentDate, i)
    lastMonths.push(month)
  }

  const revenueAndExpensesByMonth = lastMonths.map((month) => {
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
