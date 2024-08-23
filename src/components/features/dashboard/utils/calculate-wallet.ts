import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

export const calculateWallet = (data: TransactionFormProps[]) => {
  const income = data
    .filter((item) => !item.transaction)
    .map((transactions) => new Decimal(transactions.value))

  const expense = data
    .filter((item) => item.transaction)
    .map((transactions) => new Decimal(transactions.value))

  const incomeTotal = income.reduce((acc, cur) => acc.plus(cur), new Decimal(0))
  const expenseTotal = expense.reduce(
    (acc, cur) => acc.plus(cur),
    new Decimal(0),
  )
  const total = incomeTotal.minus(expenseTotal).abs()

  return {
    income: parseFloat(incomeTotal.toFixed(2)),
    expense: parseFloat(expenseTotal.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  }
}
