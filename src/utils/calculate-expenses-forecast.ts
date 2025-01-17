import Decimal from 'decimal.js'
import { MonthyPreviewFormProps } from '@/features/notes/schemas/expenses-monthly-schema'

export const calculateExpensesForecast = (data: MonthyPreviewFormProps[]) => {
  const total = data
    .map((transaction) => new Decimal(transaction.value || 0))
    .reduce((acc, cur) => acc.plus(cur), new Decimal(0))

  return total.toNumber()
}
