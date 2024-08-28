import { UserData } from '@/lib/types'
import { useDateStore } from '@/store'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import WalletCard from '../../../@globals/wallet-card'
import { CircleDollarSign } from 'lucide-react'
import { calculateCombinedMonthlyWithDateRevenue } from '../utils/calculate-combined-monthly-balance'
import { calculateMostSpentCategoryByMonth } from '../utils/calculate-most-spent-category-by-month'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { calculateCategoryPercentages } from '@/utils/calculate-balance-to-cards'
import { calculateMostSpentCategory } from '../../dashboard/utils/calculate-most-spent-category'

export default function TransactionsCards({ user }: { user: UserData }) {
  const { date } = useDateStore()
  const { transactionData } = useGetTransactions(user)

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
    <>
      <WalletCard
        title="Faturamento mensal"
        description="Valor total de entradas e saídas"
        icon={CircleDollarSign}
        value={formatteCurrency(monthlyResult.total)}
      />
      <WalletCard
        title="Entradas"
        description="Valor total de entradas"
        icon={HiArrowTrendingUp}
        value={formatteCurrency(monthlyResult.income)}
      />
      <WalletCard
        title="Saídas"
        description="Valor total de saídas"
        icon={HiArrowTrendingDown}
        value={formatteCurrency(monthlyResult.expense)}
      />
      <WalletCard
        title="Categoria mais gasta"
        description={mostSpentCategoryDesc}
        icon={MdOutlineCategory}
        value={formatteCurrency(categoryResultMonthly.total)}
      />
    </>
  )
}
