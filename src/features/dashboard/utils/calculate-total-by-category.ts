import Decimal from 'decimal.js'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'

export function calculateTotalByCategory(transactions: TransactionFormProps[]) {
  const totals = transactions.reduce(
    (acc, item) => {
      const { category, value } = item
      const numericValue = new Decimal(value || 0)

      if (acc[category]) {
        acc[category] = acc[category].plus(numericValue)
      } else {
        acc[category] = numericValue
      }

      return acc
    },
    {} as Record<string, Decimal>,
  )

  return Object.keys(totals).map((category) => ({
    category,
    total: totals[category].toNumber(),
  }))
}
