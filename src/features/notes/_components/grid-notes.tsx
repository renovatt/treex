'use client'
import Decimal from 'decimal.js'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import WalletCard from '@/components/@globals/wallet-card'
import { useGetCreditCards } from '@/hooks/firebase/use-get-credit-card'

export default function GridNotes() {
  const { monthlyData } = useGetMonthly()
  const result = calculateExpensesForecast(monthlyData)
  const { creditCardsData } = useGetCreditCards()

  const creditCardTotalExpenses = creditCardsData?.reduce((acc, card) => {
    const totalExpenses =
      card?.expenses?.reduce(
        (acc, expense) => acc.plus(expense.value),
        new Decimal(0),
      ) ?? 0

    return acc.plus(totalExpenses)
  }, new Decimal(0))

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        // className="col-span-2"
        title="Despesas"
        description="Previsão de despesas"
        icon={CircleDollarSign}
        value={result}
      />
      <WalletCard
        // className="col-span-2"
        title="Cartões de Crédito"
        description="Despesas dos cartões de crédito"
        icon={CircleDollarSign}
        value={Number(creditCardTotalExpenses.toFixed(2))}
      />
    </section>
  )
}
