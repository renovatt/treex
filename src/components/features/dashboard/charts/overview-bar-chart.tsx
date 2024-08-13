'use client'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { UserData } from '@/lib/types'
import { calculateRevenueByMonth } from '@/utils/calculate-revenue-by-month'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export function OverviewBarChart({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const calculateTransactions = calculateRevenueByMonth(transactionData)

  const data = calculateTransactions.map((item) => ({
    name: item.month,
    total: item.revenue,
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
