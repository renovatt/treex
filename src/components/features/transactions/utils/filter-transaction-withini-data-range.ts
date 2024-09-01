import { TransactionFormProps } from '@/schemas'
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns'

interface DateRange {
  from: Date
  to: Date
}

export function filterTransactionsWithinDateRange(
  transactions: TransactionFormProps[],
  dateRange: DateRange,
): TransactionFormProps[] {
  const { from, to } = dateRange

  const normalizedFrom = startOfDay(from)
  const normalizedTo = endOfDay(to)

  const filteredData = transactions
    .filter((transaction) => {
      if (!transaction.date) return false

      const transactionDate = parseISO(transaction.date.toString())

      return isWithinInterval(transactionDate, {
        start: normalizedFrom,
        end: normalizedTo,
      })
    })
    .sort((a, b) => {
      return (
        parseISO(a.date?.toString() ?? '').getTime() -
        parseISO(b.date?.toString() ?? '').getTime()
      )
    })

  return filteredData
}
