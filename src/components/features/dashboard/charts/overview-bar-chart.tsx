'use client'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { UserData } from '@/lib/types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { calculateLast7MonthsRevenue } from '../utils/calculate-last-7months-revenue '
import { useGetTransactions } from '@/hooks/use-get-transactions'

export function OverviewBarChart({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const calculateTransactions = calculateLast7MonthsRevenue(transactionData)

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
            fill="hsl(var(--chart-2))"
            radius={[8, 8, 0, 0]}
            className="hsl(var(--chart-2))"
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
