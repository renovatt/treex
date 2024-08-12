import { UserData } from '@/lib/types'
import { TbReportMoney } from 'react-icons/tb'
import { monthlyExpensesCalculator, shortNumber } from '@/utils'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import WalletCard from '../../@globals/wallet-card'

export default function MontlhyCard({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = monthlyExpensesCalculator(monthlyData)
  const shortResult = shortNumber(result)
  return (
    <WalletCard
      title="Total"
      description="Total"
      icon={TbReportMoney}
      value={`R$ ${shortResult}`}
    />
  )
}
