import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/schemas'
import { calculateCurrentMonthlyRevenue } from '@/components/features/dashboard/utils/calculate-current-monthly-revenue'

const handleDailyBalance = (
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
    .map((transaction) => new Decimal(transaction.value || 0))

  const expense = filteredTransactions
    .filter((transaction) => transaction.transaction)
    .map((transaction) => new Decimal(transaction.value || 0))

  const incomeTotal = income.reduce((acc, cur) => acc.plus(cur), new Decimal(0))
  const expenseTotal = expense.reduce(
    (acc, cur) => acc.plus(cur),
    new Decimal(0),
  )
  const total = incomeTotal.minus(expenseTotal)

  return {
    income: incomeTotal.toNumber(),
    expense: expenseTotal.toNumber(),
    total: total.toNumber(),
  }
}

export const calculateCombinedMonthlyWithDateRevenue = (
  data: TransactionFormProps[],
  customDate?: string,
) => {
  if (customDate) {
    return handleDailyBalance(data, customDate)
  } else {
    return calculateCurrentMonthlyRevenue(data)
  }
}
