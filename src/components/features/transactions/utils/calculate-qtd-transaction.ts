import { TransactionFormProps } from '@/schemas'

export const getCurrentMonthTransactionCount = (
  transactions: TransactionFormProps[],
): number => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const transactionsThisMonth = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date || '')
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    )
  })

  return transactionsThisMonth.length
}

export const getIncomeTransactionCount = (
  transactions: TransactionFormProps[],
): number => {
  const incomeTransactions = transactions.filter(
    (transaction) => !transaction.transaction,
  )
  return incomeTransactions.length
}
