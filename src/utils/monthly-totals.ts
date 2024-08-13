import { TransactionFormProps } from '@/schemas'

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

// export const calculateCategoryByMonth = (
//   data: TransactionFormProps[],
//   selectedDateString?: string,
// ) => {
//   let currentMonth: number, currentYear: number

//   if (selectedDateString) {
//     const brlDate = selectedDateString.split('T')[0]
//     const dateParts = brlDate.split('/')
//     const selectedDate = new Date(
//       `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
//     )

//     currentMonth = selectedDate.getMonth()
//     currentYear = selectedDate.getFullYear()
//   } else {
//     const currentDate = new Date()
//     currentMonth = currentDate.getMonth()
//     currentYear = currentDate.getFullYear()
//   }

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
