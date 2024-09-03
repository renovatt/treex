'use client'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { calculateLastMonthsRevenue } from '../../utils/calculate-last-months-revenue '
import { useGetTransactions } from '@/hooks/use-get-transactions'

export function OverviewBarChart() {
  const { transactionData } = useGetTransactions()
  const calculateTransactions = calculateLastMonthsRevenue(transactionData)

  const chartData = calculateTransactions.map((item) => ({
    month: item.month,
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
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          <Bar dataKey="total">
            <LabelList position="top" dataKey="month" fillOpacity={1} />
            {chartData.map((item) => (
              <Cell
                key={item.month}
                fill={
                  item.total > 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-5))'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
