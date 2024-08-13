'use client'
import { UserData } from '@/lib/types'
import { TbMoneybag } from 'react-icons/tb'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import WalletCard from '../../@globals/wallet-card'
import { shortNumber } from '@/utils/short-number'
import { calculateWallet } from './utils/calculate-wallet'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { calculateMostSpentCategory } from './utils/calculate-most-spent-category'
import { calculateCurrentMonthlyRevenue } from './utils/calculate-current-monthly-revenue'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { useGetMonthly } from '@/hooks/use-get-monthly'

export default function DashCards({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const { monthlyData } = useGetMonthly(user)

  const expensesForecast = calculateExpensesForecast(monthlyData)
  const calculatedWallet = calculateWallet(transactionData)
  const monthlyRevenue = calculateCurrentMonthlyRevenue(transactionData)
  const categoryResultAll = calculateMostSpentCategory(transactionData)

  const wallet = shortNumber(calculatedWallet.total)
  const monthlyBalance = shortNumber(monthlyRevenue.total)
  const categoryResult = shortNumber(categoryResultAll.total)
  return (
    <>
      <WalletCard
        title="Carteira"
        description="Carteira"
        icon={IoWalletOutline}
        value={`R$ ${wallet}`}
      />
      <WalletCard
        title="Faturamento mensal"
        description="Faturamento mensal"
        icon={TbMoneybag}
        value={`R$ ${monthlyBalance}`}
      />
      <WalletCard
        title="Previsão de gastos"
        description="Previsão de gastos"
        icon={MdOutlineMoneyOff}
        value={expensesForecast.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
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
