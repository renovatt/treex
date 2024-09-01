'use client'
import { Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { calculateTotalByCategory } from '../../utils/calculate-total-by-category'
import { incomeCategories } from '@/static/categories'

export function OverviewDonutChart() {
  const { transactionData } = useGetTransactions()
  const categoryTotals = calculateTotalByCategory(transactionData)

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
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="revenue"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={0}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
        />
        <ChartLegend
          align="center"
          content={<ChartLegendContent nameKey="category" />}
          className="-translate-y-2 flex-wrap gap-2 whitespace-nowrap [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
