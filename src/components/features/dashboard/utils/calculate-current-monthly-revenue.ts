import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'
import { parse, getMonth, getYear } from 'date-fns'

export const calculateCurrentMonthlyRevenue = (
  data: TransactionFormProps[],
) => {
  const currentDate = new Date()
  const currentMonth = getMonth(currentDate)
  const currentYear = getYear(currentDate)

  const filteredTransactions = data.filter((transaction) => {
    const transactionDate = parse(
      transaction.date ? transaction.date.toString() : '',
      "yyyy-MM-dd'T'HH:mm:ss.SSSX",
      new Date(),
    )
    return (
      getMonth(transactionDate) === currentMonth &&
      getYear(transactionDate) === currentYear
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
