import { UserData } from '@/lib/types'
import { useDateStore } from '@/store'
import { MdOutlineCategory } from 'react-icons/md'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import WalletCard from '../../@globals/wallet-card'
import { handleCombinedMonthlyBalance } from '@/utils/combined-monthly-balance'
import { handleMostSpentCategoryByMonth } from '@/utils/most-spent-category-by-month'
import { shortNumber } from '@/utils/short-number'
import { CircleDollarSign } from 'lucide-react'

export default function TransactionsCards({ user }: { user: UserData }) {
  const { date } = useDateStore()
  const { transactionData } = useGetTransactions(user)

  const monthlyResult = handleCombinedMonthlyBalance(transactionData, date)
  const categoryResultMonthly = handleMostSpentCategoryByMonth(
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
