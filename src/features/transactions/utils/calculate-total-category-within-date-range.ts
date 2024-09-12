import { isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { TransactionFormProps } from '../schemas/transaction-schema'

interface DateRange {
  from: Date
  to: Date
}

export function calculateTotalCategoryWithinDateRange(
  transactions: TransactionFormProps[],
  dateRange: DateRange,
) {
  const { from, to } = dateRange

  const normalizedFrom = startOfDay(from)
  const normalizedTo = endOfDay(to)

  const totals = transactions.reduce(
    (acc, item) => {
      const { category, value, date } = item
      const numericValue = parseFloat(value.toString())
      const transactionDate = new Date(date || '')

      if (
        isWithinInterval(transactionDate, {
          start: normalizedFrom,
          end: normalizedTo,
        })
      ) {
        if (category) {
          if (acc[category]) {
            acc[category] += numericValue
          } else {
            acc[category] = numericValue
          }
        }
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
