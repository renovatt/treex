'use client'
import { useDateStore } from '@/store'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { CircleDollarSign } from 'lucide-react'
import { calculateCombinedMonthlyWithDateRevenue } from '../utils/calculate-combined-monthly-balance'
import { calculateMostSpentCategoryByMonth } from '../utils/calculate-most-spent-category-by-month'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { calculateCategoryPercentages } from '@/utils/calculate-balance-to-cards'
import { calculateMostSpentCategory } from '../../dashboard/utils/calculate-most-spent-category'
import WalletCard from '@/components/@globals/wallet-card'

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

  const categoryRevenue = calculateMostSpentCategory(transactionData)

  const categoryPercentages = calculateCategoryPercentages(
    transactionData || [],
  )

  const percentage =
    categoryPercentages.find(
      (category) => category.category === categoryRevenue.category,
    )?.percentage || '0.00'
  const category = categoryRevenue.category
    ? categoryRevenue.category
    : 'sem categorias'

  const mostSpentCategoryDesc = categoryRevenue.category
    ? `${percentage}% com ${category}`
    : `${percentage}% ${category}`

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        title="Faturamento mensal"
        description="Valor total de entradas e saídas"
        icon={CircleDollarSign}
        value={monthlyResult.total}
      />
      <WalletCard
        title="Entradas"
        description="Valor total de entradas"
        icon={HiArrowTrendingUp}
        value={monthlyResult.income}
      />
      <WalletCard
        title="Saídas"
        description="Valor total de saídas"
        icon={HiArrowTrendingDown}
        value={monthlyResult.expense}
      />
      <WalletCard
        title="Categoria mais gasta"
        description={mostSpentCategoryDesc}
        icon={MdOutlineCategory}
        value={categoryResultMonthly.total}
      />
    </section>
  )
}
