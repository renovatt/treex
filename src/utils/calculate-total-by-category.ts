import { TransactionFormProps } from '@/schemas'

export function calculateTotalByCategory(transactions: TransactionFormProps[]) {
  const totals = transactions.reduce(
    (acc, item) => {
      const { category, value } = item
      const numericValue = parseFloat(value)

      if (acc[category]) {
        acc[category] += numericValue
      } else {
        acc[category] = numericValue
      }

      return acc
    },
    {} as Record<string, number>,
  )

  return Object.keys(totals).map((category) => ({
    category,
    total: totals[category],
  }))
}

// export function calculateTotalByCategoryPerDate(
//   transactions: TransactionFormProps[],
//   selectedDateString?: string,
// ) {
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

//   const totals = transactions.reduce(
//     (acc, item) => {
//       const { category, value, date } = item
//       const numericValue = parseFloat(value)
//       const transactionDate = new Date(date || '')

//       if (
//         transactionDate.getMonth() === currentMonth &&
//         transactionDate.getFullYear() === currentYear
//       ) {
//         if (acc[category]) {
//           acc[category] += numericValue
//         } else {
//           acc[category] = numericValue
//         }
//       }

//       return acc
//     },
//     {} as Record<string, number>,
//   )

//   return Object.keys(totals).map((category) => ({
//     category,
//     total: totals[category],
//   }))
// }
