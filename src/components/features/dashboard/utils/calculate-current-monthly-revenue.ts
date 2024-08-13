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
    .map((transaction) => parseFloat(transaction.value) || 0)

  const expense = filteredTransactions
    .filter((transaction) => transaction.transaction)
    .map((transaction) => parseFloat(transaction.value) || 0)

  const incomeTotal = income.reduce((acc, cur) => acc + cur, 0)
  const expenseTotal = expense.reduce((acc, cur) => acc + cur, 0)
  const total = incomeTotal - expenseTotal

  return {
    income: incomeTotal,
    expense: expenseTotal,
    total,
  }
}
