'use client'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { UserData } from '@/lib/types'
import { calculateRevenueByMonth } from '@/utils/calculate-revenue-by-month'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

export function OverviewBarChart({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const calculateTransactions = calculateRevenueByMonth(transactionData)

  const data = calculateTransactions.map((item) => ({
    name: item.month,
    total: item.revenue,
  }))

  const chartConfig = {
    desktop: {
      label: 'total',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            stroke="#888888"
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              `${value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[8, 8, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
