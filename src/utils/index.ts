import { MonthyPreviewFormProps, TransactionFormProps } from '@/schemas'
import { CandleTypeProps } from '@elements/ChartJS/Candlestick/types'

interface CategoryTotals {
  [category: string]: number
}

export default function createCandle(
  openTime: string | number | Date,
  open: string,
  high: string,
  low: string,
  close: string,
): CandleTypeProps {
  return {
    x: new Date(openTime),
    y: [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close)],
  }
}

export const handleWalletBalance = (data: TransactionFormProps[]) => {
  const income = data
    .filter((item) => !item.transaction)
    .map((transactions) => parseFloat(transactions.value))

  const expense = data
    .filter((item) => item.transaction)
    .map((transactions) => parseFloat(transactions.value))

  const incomeTotal = income.reduce((acc, cur) => acc + cur, 0)
  const expenseTotal = expense.reduce((acc, cur) => acc + cur, 0)
  const total = Math.abs(incomeTotal - expenseTotal)

  return {
    income: incomeTotal,
    expense: expenseTotal,
    total,
  }
}

export const handleCurrentMonthlyBalance = (data: TransactionFormProps[]) => {
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

export const handleMostSpentCategory = (
  data: TransactionFormProps[],
  currentMonthOnly = false,
) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = parseFloat(transaction.value) || 0
    const transactionDate = new Date(transaction.date ?? '')

    if (
      category !== 'Salário' &&
      (!currentMonthOnly ||
        (transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear))
    ) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0
      }

      categoryTotals[category] += value
    }
  })

  let mostSpentCategory = null
  let mostSpentTotal = 0

  for (const category in categoryTotals) {
    if (categoryTotals[category] > mostSpentTotal) {
      mostSpentCategory = category
      mostSpentTotal = categoryTotals[category]
    }
  }

  return {
    category: mostSpentCategory,
    total: mostSpentTotal,
  }
}

export const monthlyExpensesCalculator = (data: MonthyPreviewFormProps[]) => {
  const amount = data.map((transactions) => parseFloat(transactions.value))
  const total = amount.reduce((acc, cur) => acc + cur, 0)
  return total
}

export const shortNumber = (numero: number) => {
  if (numero >= 1e6) {
    return (numero / 1e6).toFixed(1) + 'M'
  } else if (numero >= 1e3) {
    return (numero / 1e3).toFixed(1) + 'k'
  } else {
    return numero.toString()
  }
}
