import { UserData } from '@/lib/types'
import CardValue from '@elements/CardValue'
import { TbReportMoney } from 'react-icons/tb'
import { monthlyExpensesCalculator } from '@/utils'
import { useGetMonthly } from '@/hooks/useGetMonthly'

export default function MontlhyCardValue({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const result = monthlyExpensesCalculator(monthlyData)
  return (
    <CardValue
      description="Total"
      icon={TbReportMoney}
      side="left"
      value={result.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}
    />
  )
}
