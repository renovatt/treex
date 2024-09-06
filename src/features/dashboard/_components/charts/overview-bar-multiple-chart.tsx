'use client'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { calculateLastMonthsRevenueAndExpenses } from '../../utils/calculate-last-months-revenue-and-expenses '

export const description = 'A multiple bar chart'

export function OverviewBarMultipleChart() {
  const { transactionData } = useGetTransactions()
  const calculateTransactions = calculateLastMonthsRevenueAndExpenses(
    transactionData,
    5,
  )

  const chartData = calculateTransactions.map((item) => ({
    month: item.month,
    revenue: item.revenue,
    expenses: item.expenses,
  }))

  const chartConfig = {
    revenue: {
      label: 'Faturamento',
      color: 'hsl(var(--chart-1))',
    },
    expenses: {
      label: 'Despesas',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={4} />
          <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={4} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
