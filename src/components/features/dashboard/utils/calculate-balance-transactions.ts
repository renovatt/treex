import { TransactionFormProps } from '@/schemas'

export const calculateBalanceTransactions = (data: TransactionFormProps[]) => {
  const income = data
    .filter((transaction) => !transaction.transaction)
    .reduce((total, transaction) => total + parseFloat(transaction.value), 0)

  const expenses = data
    .filter((transaction) => transaction.transaction)
    .reduce((total, transaction) => total + parseFloat(transaction.value), 0)

  return { income, expenses }
}
