import { UserData } from '@/lib/types'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import WalletCard from '../../@globals/wallet-card'
import { handleMonthlyExpensesCalculator } from '@/utils/monthly-expenses-calculator'
import { shortNumber } from '@/utils/short-number'
import { CircleDollarSign } from 'lucide-react'

export default function MontlhyCard({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = handleMonthlyExpensesCalculator(monthlyData)
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
