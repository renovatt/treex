import { CandleTypeProps } from '@/components/features/cripto/charts/candlestick-chart'
import { MonthyPreviewFormProps, TransactionFormProps } from '@/schemas'

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

export const handleDailyBalance = (
  data: TransactionFormProps[],
  customDate?: string,
) => {
  const currentDate = customDate ? new Date(customDate) : new Date()

  const filteredTransactions = data.filter((transaction) => {
    const transactionDate = new Date(transaction.date || '')

    if (customDate) {
      const brlDate = customDate.split('T')[0]
      const dateParts = brlDate.split('/')
      const selectedDate = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
      ).getTime()

      return (
        transactionDate.getFullYear() ===
          new Date(selectedDate).getFullYear() &&
        transactionDate.getMonth() === new Date(selectedDate).getMonth() &&
        transactionDate.getDate() === new Date(selectedDate).getDate()
      )
    }

    return (
      transactionDate.getFullYear() === currentDate.getFullYear() &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getDate() === currentDate.getDate()
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

export const handleCombinedMonthlyBalance = (
  data: TransactionFormProps[],
  customDate?: string,
) => {
  if (customDate) {
    return handleDailyBalance(data, customDate)
  } else {
    return handleCurrentMonthlyBalance(data)
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
      category !== 'Bônus/Entrada/Salário' &&
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

export const handleMostSpentCategoryByMonth = (
  data: TransactionFormProps[],
  selectedDateString?: string,
) => {
  const currentDate = new Date()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()

  if (selectedDateString) {
    const brlDate = selectedDateString.split('T')[0]
    const dateParts = brlDate.split('/')
    const selectedDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
    )

    currentMonth = selectedDate.getMonth()
    currentYear = selectedDate.getFullYear()
  }

  const categoryTotals: CategoryTotals = {}

  data.forEach((transaction) => {
    const category = transaction.category
    const value = parseFloat(transaction.value) || 0
    const transactionDate = new Date(transaction.date || '')

    if (
      category !== 'Bônus/Entrada/Salário' &&
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
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

// export const shortNumber = (numero: number) => {
//   if (numero >= 1e6) {
//     return (numero / 1e6).toFixed(1) + 'M'
//   } else if (numero >= 1e3) {
//     return (numero / 1e3).toFixed(1) + 'k'
//   } else {
//     return numero.toString()
//   }
// }

export const shortNumber = (numero: number) => {
  if (numero >= 1e6) {
    return (
      (numero / 1e6).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + 'M'
    )
  } else if (numero >= 1e3) {
    return (
      (numero / 1e3).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + 'k'
    )
  } else {
    return numero.toLocaleString()
  }
}

// once
export function getMonthlyTotals(transactions: TransactionFormProps[]) {
  const formatMonth = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', { month: 'short' })
  }

  const getYear = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.getFullYear()
  }

  const monthlyTotals: { [key: string]: number } = {}

  const currentYear = new Date().getFullYear()

  transactions.forEach((item) => {
    const month = formatMonth(Number(item.date))
    const year = getYear(Number(item.date))

    if (year === currentYear) {
      const value = parseFloat(item.value)

      if (monthlyTotals[month]) {
        monthlyTotals[month] += value
      } else {
        monthlyTotals[month] = value
      }
    }
  })

  return Object.keys(monthlyTotals).map((month) => ({
    name: month,
    total: monthlyTotals[month],
  }))
}

// export const calculateCategoryByMonth = (data: TransactionFormProps[]) => {
//   const currentDate = new Date()
//   const currentMonth = currentDate.getMonth()
//   const currentYear = currentDate.getFullYear()

//   const categoryTotals: { [key: string]: number } = {}

//   data.forEach((transaction) => {
//     const transactionDate = new Date(transaction.date || '')
//     const isIncome = !transaction.transaction

//     if (
//       !isIncome &&
//       transactionDate.getMonth() === currentMonth &&
//       transactionDate.getFullYear() === currentYear
//     ) {
//       const category = transaction.category
//       const value = parseFloat(transaction.value) || 0

//       if (!categoryTotals[category]) {
//         categoryTotals[category] = 0
//       }

//       categoryTotals[category] += value
//     }
//   })

//   const chartData = {
//     options: {
//       labels: Object.keys(categoryTotals),
//     },
//     series: Object.values(categoryTotals),
//   }

//   return chartData
// }

export const calculateCategoryByMonth = (
  data: TransactionFormProps[],
  selectedDateString?: string,
) => {
  let currentMonth: number, currentYear: number

  if (selectedDateString) {
    const brlDate = selectedDateString.split('T')[0]
    const dateParts = brlDate.split('/')
    const selectedDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
    )

    currentMonth = selectedDate.getMonth()
    currentYear = selectedDate.getFullYear()
  } else {
    const currentDate = new Date()
    currentMonth = currentDate.getMonth()
    currentYear = currentDate.getFullYear()
  }

  const categoryTotals: { [key: string]: number } = {}

  data.forEach((transaction) => {
    const transactionDate = new Date(transaction.date || '')
    const isIncome = !transaction.transaction

    if (
      !isIncome &&
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      const category = transaction.category
      const value = parseFloat(transaction.value) || 0

      if (!categoryTotals[category]) {
        categoryTotals[category] = 0
      }

      categoryTotals[category] += value
    }
  })

  const chartData = {
    options: {
      labels: Object.keys(categoryTotals),
    },
    series: Object.values(categoryTotals),
  }

  return chartData
}
