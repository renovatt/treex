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

  return (
    <>
      <WalletCard
        title="Total"
        description="Total"
        icon={CircleDollarSign}
        value={formatteCurrency(monthlyResult.total)}
      />
      <WalletCard
        title="Entradas"
        description="Entradas"
        icon={HiArrowTrendingUp}
        value={formatteCurrency(monthlyResult.income)}
      />
      <WalletCard
        title="Saídas"
        description="Saídas"
        icon={HiArrowTrendingDown}
        value={formatteCurrency(monthlyResult.expense)}
      />
      <WalletCard
        title="Categoria mais gasta"
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        value={formatteCurrency(categoryResultMonthly.total)}
      />
    </>
  )
}
