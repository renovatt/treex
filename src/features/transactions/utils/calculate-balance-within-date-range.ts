import Decimal from 'decimal.js'
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns'
import { TransactionFormProps } from '../schemas/transaction-schema'

export const calculateBalanceWithinDateRange = (
  data: TransactionFormProps[],
  dateRange: { from: Date; to: Date },
) => {
  let filteredTransactions = data

  if (dateRange && dateRange.from && dateRange.to) {
    filteredTransactions = data.filter((transaction) => {
      const transactionDate = parseISO(transaction.date?.toString() || '')
      return isWithinInterval(transactionDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      })
    })
  }

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
