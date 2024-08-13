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
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { calculateLastMonthsRevenue } from '../utils/calculate-last-months-revenue '
import { useGetTransactions } from '@/hooks/use-get-transactions'

export function OverviewBarChart({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const calculateTransactions = calculateLastMonthsRevenue(transactionData)

  const chartData = calculateTransactions.map((item) => ({
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
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          <Bar dataKey="total">
            <LabelList position="top" dataKey="name" fillOpacity={1} />
            {chartData.map((item) => (
              <Cell
                key={item.name}
                fill={
                  item.total > 0 ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
