'use client'
import { UserData } from '@/lib/types'
import { TbMoneybag } from 'react-icons/tb'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import WalletCard from '../../../@globals/wallet-card'
import { calculateWallet } from '../utils/calculate-wallet'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { calculateMostSpentCategory } from '../utils/calculate-most-spent-category'
import { calculateCurrentMonthlyRevenue } from '../utils/calculate-current-monthly-revenue'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { useGetMonthly } from '@/hooks/use-get-monthly'
import { formatteCurrency } from '@/utils/format-currency-brl'

export default function DashCards({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const { monthlyData } = useGetMonthly(user)

  const wallet = calculateWallet(transactionData)
  const monthlyRevenue = calculateCurrentMonthlyRevenue(transactionData)
  const expensesForecast = calculateExpensesForecast(monthlyData)
  const categoryRevenue = calculateMostSpentCategory(transactionData)

  return (
    <>
      <WalletCard
        title="Carteira"
        description="Carteira"
        icon={IoWalletOutline}
        value={formatteCurrency(wallet.total)}
      />
      <WalletCard
        title="Faturamento mensal"
        description="Faturamento mensal"
        icon={TbMoneybag}
        value={formatteCurrency(monthlyRevenue.total)}
      />
      <WalletCard
        title="Previsão de gastos"
        description="Previsão de gastos"
        icon={MdOutlineMoneyOff}
        value={formatteCurrency(expensesForecast)}
      />
      <WalletCard
        title="Categoria mais gasta"
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        value={formatteCurrency(categoryRevenue.total)}
      />
    </>
  )
}
