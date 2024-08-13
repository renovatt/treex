import { MonthyPreviewFormProps } from '@/schemas'

export const handleMonthlyExpensesCalculator = (
  data: MonthyPreviewFormProps[],
) => {
  const amount = data.map((transactions) => parseFloat(transactions.value))
  const total = amount.reduce((acc, cur) => acc + cur, 0)
  return total
}
