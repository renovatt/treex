'use client'
import Decimal from 'decimal.js'
import { CircleDollarSign, CreditCard } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import WalletCard from '@/components/@globals/wallet-card'
import { useGetCreditCards } from '@/hooks/firebase/use-get-credit-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

  const total = new Decimal(result).plus(creditCardTotalExpenses)

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        // className="col-span-2"
        title="Total"
        description="Total de despesas"
        icon={CircleDollarSign}
        value={Number(total.toFixed(2))}
      />
      <WalletCard
        // className="col-span-2"
        title="Despesas fixas"
        description="Previsão de despesas fixas"
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cartões</CardTitle>
          <CreditCard className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{creditCardsData.length}</div>
          <p className="text-xs text-muted-foreground">Cartões cadastrados</p>
        </CardContent>
      </Card>
    </section>
  )
}
