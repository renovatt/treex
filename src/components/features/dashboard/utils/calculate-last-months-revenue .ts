import { TransactionFormProps } from '@/schemas'

export const calculateLastMonthsRevenue = (
  data: TransactionFormProps[],
  qnt: number = 11,
) => {
  const currentDate = new Date()
  const last7Months = []

  for (let i = qnt; i >= 0; i--) {
    const month = new Date(currentDate)
    month.setMonth(currentDate.getMonth() - i)
    last7Months.push(month)
  }

  const revenueByMonth = last7Months.map((month) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0)

    const monthName = new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
    }).format(month)

    const capitalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase()

    const income = data
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date ?? '')
        return (
          transactionDate >= firstDay &&
          transactionDate <= lastDay &&
          !transaction.transaction
        )
      })
      .reduce((total, transaction) => total + parseFloat(transaction.value), 0)

    const expenses = data
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date ?? '')
        return (
          transactionDate >= firstDay &&
          transactionDate <= lastDay &&
          transaction.transaction
        )
      })
      .reduce((total, transaction) => total + parseFloat(transaction.value), 0)

    const revenue = income - expenses

    return {
      month: capitalizedMonthName,
      revenue,
    }
  })

  return revenueByMonth
}
