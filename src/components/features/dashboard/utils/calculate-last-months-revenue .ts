import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

export const calculateLastMonthsRevenue = (
  data: TransactionFormProps[],
  qnt: number = 11,
) => {
  const currentDate = new Date()
  const lastMonths = []

  for (let i = qnt; i >= 0; i--) {
    const month = new Date(currentDate)
    month.setMonth(currentDate.getMonth() - i)
    lastMonths.push(month)
  }

  const revenueByMonth = lastMonths.map((month) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0)

    const monthName = new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
    }).format(month)

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
    }
  })

  return revenueByMonth
}
