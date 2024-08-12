'use client'
import { UserData } from '@/lib/types'
import { TbMoneybag } from 'react-icons/tb'
import { IoWalletOutline } from 'react-icons/io5'
import {
  handleCurrentMonthlyBalance,
  handleMostSpentCategory,
  handleWalletBalance,
  monthlyExpensesCalculator,
  shortNumber,
} from '@/utils'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import WalletCard from '../../@globals/wallet-card'

export default function DashCards({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const { monthlyData } = useGetMonthly(user)

  const monthlyPreview = monthlyExpensesCalculator(monthlyData)
  const allResult = handleWalletBalance(transactionData)
  const monthlyResult = handleCurrentMonthlyBalance(transactionData)
  const categoryResultAll = handleMostSpentCategory(transactionData)

  const wallet = shortNumber(allResult.total)
  const monthlyBalance = shortNumber(monthlyResult.total)
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
        value={monthlyPreview.toLocaleString('pt-br', {
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
