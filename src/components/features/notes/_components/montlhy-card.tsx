import { UserData } from '@/lib/types'
import WalletCard from '../../../@globals/wallet-card'
import { shortNumber } from '@/utils/short-number'
import { CircleDollarSign } from 'lucide-react'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { useGetMonthly } from '@/hooks/use-get-monthly'

export default function MontlhyCard({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = calculateExpensesForecast(monthlyData)
  const shortResult = shortNumber(result)
  return (
    <WalletCard
      title="Total"
      description="Total"
      icon={CircleDollarSign}
      value={`R$ ${shortResult}`}
    />
  )
}
