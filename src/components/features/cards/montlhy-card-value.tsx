import { UserData } from '@/lib/types'
import { TbReportMoney } from 'react-icons/tb'
import { monthlyExpensesCalculator, shortNumber } from '@/utils'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import CardWallet from '@/components/features/cards/card-wallet'

export default function MontlhyCardValue({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = monthlyExpensesCalculator(monthlyData)
  const shortResult = shortNumber(result)
  return (
    <CardWallet
      description="Total"
      icon={TbReportMoney}
      side="left"
      value={`R$ ${shortResult}`}
    />
  )
}
