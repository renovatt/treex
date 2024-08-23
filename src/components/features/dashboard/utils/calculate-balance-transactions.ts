import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

export const calculateBalanceTransactions = (data: TransactionFormProps[]) => {
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

  return {
    income: income.toNumber(),
    expenses: expenses.toNumber(),
  }
}
