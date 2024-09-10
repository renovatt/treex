'use client'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import WalletCard from '@/components/@globals/wallet-card'

export default function GridNotes() {
  const { monthlyData } = useGetMonthly()
  const result = calculateExpensesForecast(monthlyData)

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        // className="col-span-2"
        title="Despesas"
        description="Estimativa de gastos para o mês"
        icon={CircleDollarSign}
        value={result}
      />
      <WalletCard
        // className="col-span-2"
        title="Cartões de Crédito"
        description="Despesas dos cartões de crédito"
        icon={CircleDollarSign}
        value={result}
      />
    </section>
  )
}
