import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'
import { isSameMonth, isSameYear, parseISO } from 'date-fns'

export const getCurrentMonthTransactionCount = (
  transactions: TransactionFormProps[],
): number => {
  const currentDate = new Date()

  const transactionsThisMonth = transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date?.toString() || '')
    return (
      isSameMonth(transactionDate, currentDate) &&
      isSameYear(transactionDate, currentDate)
    )
  })

  return transactionsThisMonth.length
}

export const getIncomeTransactionCount = (
  transactions: TransactionFormProps[],
): number => {
  const currentDate = new Date()

  const incomeTransactions = transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date?.toString() || '')
    return (
      !transaction.transaction &&
      isSameMonth(transactionDate, currentDate) &&
      isSameYear(transactionDate, currentDate)
    )
  })

  return incomeTransactions.length
}
