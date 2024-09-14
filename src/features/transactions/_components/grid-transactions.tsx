'use client'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { CircleDollarSign } from 'lucide-react'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import WalletCard from '@/components/@globals/wallet-card'
import { useDateStore } from '@/store/use-date-picker-store'
import { calculateBalanceWithinDateRange } from '../utils/calculate-balance-within-date-range'
import { calculateMostSpentCategoryWithinDateRange } from '../utils/calculate-most-spent-category-within-date-range'
import { calculateCategoryPercentagesWithinDateRange } from '../utils/calculate-categories-percentage-within-date-range'

export default function GridTransactions() {
  const { dateRange } = useDateStore()
  const { transactionData } = useGetTransactions()

  const balanceDateRange = calculateBalanceWithinDateRange(transactionData, {
    from: dateRange.from || new Date(),
    to: dateRange.to || new Date(),
  })

  const categoryDateRange = calculateMostSpentCategoryWithinDateRange(
    transactionData,
    {
      from: dateRange.from || new Date(),
      to: dateRange.to || new Date(),
    },
  )

  const categoryPercentages = calculateCategoryPercentagesWithinDateRange(
    transactionData,
    {
      from: dateRange.from || new Date(),
      to: dateRange.to || new Date(),
    },
  )

  const percentage =
    categoryPercentages.find(
      (category) => category.category === categoryDateRange.category,
    )?.percentage || '0.00'
  const category = categoryDateRange.category
    ? categoryDateRange.category
    : 'sem categorias'

  const mostSpentCategoryDesc = categoryDateRange.category
    ? `${percentage}% com ${category}`
    : `${percentage}% ${category}`

  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        title="Faturamento"
        description="Valor total do faturamento"
        icon={CircleDollarSign}
        value={balanceDateRange.total}
      />
      <WalletCard
        title="Entradas"
        description="Valor total de entradas"
        icon={HiArrowTrendingUp}
        value={balanceDateRange.income}
      />
      <WalletCard
        title="Saídas"
        description="Valor total de saídas"
        icon={HiArrowTrendingDown}
        value={balanceDateRange.expense}
      />
      <WalletCard
        title="Categoria"
        description={mostSpentCategoryDesc}
        icon={MdOutlineCategory}
        value={categoryDateRange.total}
      />
    </section>
  )
}
