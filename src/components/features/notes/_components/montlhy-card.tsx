import { UserData } from '@/lib/types'
import WalletCard from '../../../@globals/wallet-card'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/use-get-monthly'

export default function MontlhyCard({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
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
