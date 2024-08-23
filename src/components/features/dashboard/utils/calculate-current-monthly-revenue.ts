import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

export const calculateCurrentMonthlyRevenue = (
  data: TransactionFormProps[],
) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const filteredTransactions = data.filter((transaction) => {
    const transactionDate = new Date(transaction.date ?? '')
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    )
  })

  const income = filteredTransactions
    .filter((transaction) => !transaction.transaction)
    .map((transaction) => new Decimal(transaction.value || 0))

  const expense = filteredTransactions
    .filter((transaction) => transaction.transaction)
    .map((transaction) => new Decimal(transaction.value || 0))

  const incomeTotal = income.reduce((acc, cur) => acc.plus(cur), new Decimal(0))
  const expenseTotal = expense.reduce(
    (acc, cur) => acc.plus(cur),
    new Decimal(0),
  )
  const total = incomeTotal.minus(expenseTotal)

  return {
    income: incomeTotal.toNumber(),
    expense: expenseTotal.toNumber(),
    total: total.toNumber(),
  }
}
