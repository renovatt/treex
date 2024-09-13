'use client'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { calculateBalanceTransactions } from '../../utils/calculate-balance-transactions'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'

export function OverviewRadialChart() {
  const { transactionData } = useGetTransactions()

  const { income, expenses } = calculateBalanceTransactions(
    transactionData || [],
  )

  const balanceTransactions = income + expenses
  const incomePercentage = (income / balanceTransactions) * 100
  const expensesPercentage = (expenses / balanceTransactions) * 100

  const chartData = [
    { month: 'balance', Entrada: incomePercentage, Saída: expensesPercentage },
  ]

  const chartConfig = {
    income: {
      label: 'Entrada',
      color: 'hsl(var(--chart-1))',
    },
    expenses: {
      label: 'Saída',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[400px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {transactionData.length > 0 &&
                        incomePercentage.toFixed(2) + '%'}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      {transactionData.length > 0 && 'Entrada'}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="Saída"
          stackId="a"
          cornerRadius={5}
          fill="hsl(var(--chart-5))"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="Entrada"
          fill="hsl(var(--chart-2))"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
