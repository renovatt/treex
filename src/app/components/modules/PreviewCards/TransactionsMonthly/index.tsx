import { UserData } from '@/lib/types'
import CardValue from '../../../elements/CardValue'
import {
  handleCurrentMonthlyBalance,
  handleMostSpentCategory,
  shortNumber,
} from '@/utils'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { MdOutlineCategory } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function TransactionsMonthly({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)

  const monthlyResult = handleCurrentMonthlyBalance(transactionData)
  const categoryResultMonthly = handleMostSpentCategory(transactionData, true)

  const monthlyBalance = shortNumber(monthlyResult.total)
  const monthlyIncome = shortNumber(monthlyResult.income)
  const monthlyExpense = shortNumber(monthlyResult.expense)
  const categoryResult = shortNumber(categoryResultMonthly.total)
  return (
    <>
      <CardValue
        description="Total"
        icon={BiTransfer}
        side="left"
        value={`R$ ${monthlyBalance}`}
      />
      <CardValue
        description="Entradas"
        icon={HiArrowTrendingUp}
        side="right"
        value={`R$ ${monthlyIncome}`}
      />
      <CardValue
        description="Saídas"
        icon={HiArrowTrendingDown}
        side="left"
        value={`R$ ${monthlyExpense}`}
      />
      <CardValue
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        side="left"
        value={`R$ ${categoryResult}`}
      />
    </>
  )
}
