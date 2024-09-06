'use client'

import {
  Area,
  AreaChart,
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

export function OverviewAreaChart() {
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

  const error = console.error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="revenue"
            type="natural"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.4}
            stroke="hsl(var(--chart-1))"
            stackId="a"
          />
          <Area
            dataKey="expenses"
            type="natural"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.4}
            stroke="hsl(var(--chart-2))"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
