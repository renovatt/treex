import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'

export const calculateCategoryPercentagesByDate = (
  data: TransactionFormProps[],
) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Função auxiliar para filtrar transações do mês atual
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

  // Calcula o total do mês atual
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

  // Calcula a porcentagem de cada categoria
  const categoryTotals: Record<string, Decimal> = {}

  currentMonthData.forEach((transaction) => {
    const category = transaction.category || 'Outros'
    const value = new Decimal(transaction.value || 0)

    if (!categoryTotals[category]) {
      categoryTotals[category] = new Decimal(0)
    }

    categoryTotals[category] = categoryTotals[category].plus(value)
  })

  const categoryPercentages = Object.keys(categoryTotals).map((category) => {
    const totalForCategory = categoryTotals[category]
    const percentage = totalForCategory
      .dividedBy(currentMonthTotal)
      .times(100)
      .toNumber()
    return {
      category,
      percentage: percentage.toFixed(2),
    }
  })

  return categoryPercentages
}
