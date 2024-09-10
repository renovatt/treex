import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'

export const calculateBalancesToCards = (data: TransactionFormProps[]) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const filterCurrentMonthTransactions = (
    transactions: TransactionFormProps[],
  ) =>
    transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date || '')
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      )
    })

  const income = data
    .filter((transaction) => !transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const expenses = data
    .filter((transaction) => transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const total = income.minus(expenses)

  const currentMonthData = filterCurrentMonthTransactions(data)
  const currentMonthIncome = currentMonthData
    .filter((transaction) => !transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const currentMonthExpenses = currentMonthData
    .filter((transaction) => transaction.transaction)
    .reduce(
      (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
      new Decimal(0),
    )

  const currentMonthTotal = currentMonthIncome.minus(currentMonthExpenses)

  return {
    general: {
      income: income.toNumber(),
      expenses: expenses.toNumber(),
      total: total.toNumber(),
    },
    currentMonth: {
      income: currentMonthIncome.toNumber(),
      expenses: currentMonthExpenses.toNumber(),
      total: currentMonthTotal.toNumber(),
    },
  }
}
