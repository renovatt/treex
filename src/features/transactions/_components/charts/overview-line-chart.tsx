'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
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
import { calculateRevenueAndExpensesForDateRange } from '../../utils/calculate-revenue-and-expenses-within-data-range'
import { useDateStore } from '@/store/use-date-picker-store'

export function OverviewLineChart() {
  const { dateRange } = useDateStore()
  const { transactionData } = useGetTransactions()

  const calculateTransactions = calculateRevenueAndExpensesForDateRange(
    transactionData,
    {
      from: dateRange.from || new Date(),
      to: dateRange.to || new Date(),
    },
  )

  const chartData = calculateTransactions.map((item) => ({
    month: item.month,
    total: item.revenue,
  }))

  const chartConfig = {
    total: {
      label: 'total',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig}>
        <LineChart
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
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="total"
            type="natural"
            stroke="hsl(var(--chart-5))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
