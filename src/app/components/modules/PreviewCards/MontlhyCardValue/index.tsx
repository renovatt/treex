import { UserData } from '@/lib/types'
import CardValue from '@elements/CardValue'
import { TbReportMoney } from 'react-icons/tb'
import { monthlyExpensesCalculator, shortNumber } from '@/utils'
import { useGetMonthly } from '@/hooks/useGetMonthly'

export default function MontlhyCardValue({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = monthlyExpensesCalculator(monthlyData)
  const shortResult = shortNumber(result)
  return (
    <CardValue
      description="Total"
      icon={TbReportMoney}
      side="left"
      value={`R$ ${shortResult}`}
    />
  )
}
