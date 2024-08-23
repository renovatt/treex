import { UserData } from '@/lib/types'
import WalletCard from '../../../@globals/wallet-card'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/use-get-monthly'
import { formatteCurrency } from '@/utils/format-currency-brl'

export default function MontlhyCard({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = calculateExpensesForecast(monthlyData)

  return (
    <WalletCard
      title="Total"
      description="Estimativa de gastos para o mês"
      icon={CircleDollarSign}
      value={formatteCurrency(result)}
    />
  )
}
