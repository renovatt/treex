import CardValue from '@/app/components/elements/CardValue'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import { UserData } from '@/lib/types'
import { monthlyExpensesCalculator } from '@/utils'
import React from 'react'
import { TbReportMoney } from 'react-icons/tb'

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
