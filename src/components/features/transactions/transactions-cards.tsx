import { UserData } from '@/lib/types'
import { useDateStore } from '@/store'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import WalletCard from '../../@globals/wallet-card'
import { shortNumber } from '@/utils/short-number'
import { CircleDollarSign } from 'lucide-react'
import { calculateCombinedMonthlyWithDateRevenue } from './utils/calculate-combined-monthly-balance'
import { calculateMostSpentCategoryByMonth } from './utils/calculate-most-spent-category-by-month'
import { useGetTransactions } from '@/hooks/use-get-transactions'

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

  const monthlyBalance = shortNumber(monthlyResult.total)
  const monthlyIncome = shortNumber(monthlyResult.income)
  const monthlyExpense = shortNumber(monthlyResult.expense)
  const categoryResult = shortNumber(categoryResultMonthly.total)
  return (
    <>
      <WalletCard
        title="Total"
        description="Total"
        icon={CircleDollarSign}
        value={`R$ ${monthlyBalance}`}
      />
      <WalletCard
        title="Entradas"
        description="Entradas"
        icon={HiArrowTrendingUp}
        value={`R$ ${monthlyIncome}`}
      />
      <WalletCard
        title="Saídas"
        description="Saídas"
        icon={HiArrowTrendingDown}
        value={`R$ ${monthlyExpense}`}
      />
      <WalletCard
        title="Categoria mais gasta"
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        value={`R$ ${categoryResult}`}
      />
    </>
  )
}
