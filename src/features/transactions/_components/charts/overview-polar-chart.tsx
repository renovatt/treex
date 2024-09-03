'use client'
import * as React from 'react'
import { Pie, PieChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { useDateStore } from '@/store/use-date-picker-store'
import { calculateTotalCategoryWithinDateRange } from '../../utils/calculate-total-category-within-date-range'
import { incomeCategories } from '@/static/categories'

export function OverviewPolarChart() {
  const { dateRange } = useDateStore()
  const { transactionData } = useGetTransactions()

  const categoryTotals = calculateTotalCategoryWithinDateRange(
    transactionData,
    {
      from: dateRange.from || new Date(),
      to: dateRange.to || new Date(),
    },
  )

  const sortedCategory = categoryTotals
    .filter((item) => !incomeCategories.includes(item.category))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  const data = sortedCategory.map((item, index) => ({
    category: item.category,
    revenue: item.total,
    fill: `hsl(var(--chart-${index + 1}))`,
  }))

  const chartConfig = sortedCategory
    .map((item, index) => ({
      [item.category]: {
        label: item.category,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    }))
    .reduce((acc, item) => ({ ...acc, ...item }), {}) satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[400px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey="revenue" nameKey="category" />
        <ChartLegend
          align="center"
          content={<ChartLegendContent nameKey="category" />}
          className="-translate-y-2 flex-wrap gap-2 whitespace-nowrap [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
