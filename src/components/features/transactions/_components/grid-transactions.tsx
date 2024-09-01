'use client'
import { useDateStore } from '@/store'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { CircleDollarSign } from 'lucide-react'
import { calculateCombinedMonthlyWithDateRevenue } from '../utils/calculate-combined-monthly-balance'
import { calculateMostSpentCategoryByMonth } from '../utils/calculate-most-spent-category-by-month'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import WalletCard from '@/components/@globals/wallet-card'
import { calculateCategoryPercentagesByDate } from '../utils/calculate-categories-percentage-by-date'

export default function GridTransactions() {
  const { date } = useDateStore()
  const { transactionData } = useGetTransactions()

  const monthlyResult = calculateCombinedMonthlyWithDateRevenue(
    transactionData,
    date,
  )
  const categoryResultMonthly = calculateMostSpentCategoryByMonth(
    transactionData,
    date,
  )

  const categoryPercentages = calculateCategoryPercentagesByDate(
    transactionData || [],
  )

  const percentage =
    categoryPercentages.find(
      (category) => category.category === categoryResultMonthly.category,
    )?.percentage || '0.00'
  const category = categoryResultMonthly.category
    ? categoryResultMonthly.category
    : 'sem categorias'

  const mostSpentCategoryDesc = categoryResultMonthly.category
    ? `${percentage}% com ${category}`
    : `${percentage}% ${category}`

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        title="Faturamento mensal"
        description="Valor total do faturamento do mês"
        icon={CircleDollarSign}
        value={monthlyResult.total}
      />
      <WalletCard
        title="Entradas"
        description="Valor total de entradas do mês"
        icon={HiArrowTrendingUp}
        value={monthlyResult.income}
      />
      <WalletCard
        title="Saídas"
        description="Valor total de saídas do mês"
        icon={HiArrowTrendingDown}
        value={monthlyResult.expense}
      />
      <WalletCard
        title="Categoria mais gasta do mês"
        description={mostSpentCategoryDesc}
        icon={MdOutlineCategory}
        value={categoryResultMonthly.total}
      />
    </section>
  )
}
