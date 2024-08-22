import { TransactionFormProps } from '@/schemas'

export const calculateWallet = (data: TransactionFormProps[]) => {
  const income = data
    .filter((item) => !item.transaction)
    .map((transactions) => parseFloat(String(transactions.value)))

  const expense = data
    .filter((item) => item.transaction)
    .map((transactions) => parseFloat(String(transactions.value)))

  const incomeTotal = income.reduce((acc, cur) => acc + cur, 0)
  const expenseTotal = expense.reduce((acc, cur) => acc + cur, 0)
  const total = Math.abs(incomeTotal - expenseTotal)

  return {
    income: incomeTotal,
    expense: expenseTotal,
    total,
  }
}
