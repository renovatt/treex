'use client'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import WalletCard from '@/components/@globals/wallet-card'

export default function GridNotes() {
  const { monthlyData } = useGetMonthly()
  const result = calculateExpensesForecast(monthlyData)

  return (
    <WalletCard
      title="Despesas"
      description="Estimativa de gastos para o mês"
      icon={CircleDollarSign}
      value={result}
    />
  )
}
