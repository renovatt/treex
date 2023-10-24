import { UserData } from '@/lib/types'
import { TbMoneybag } from 'react-icons/tb'
import CardValue from '../../../elements/CardValue'
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

export default function DashCardValues({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const { monthlyData } = useGetMonthly(user)

  const monthlyPreview = monthlyExpensesCalculator(monthlyData)
  const Allresult = handleWalletBalance(transactionData)
  const monthlyResult = handleCurrentMonthlyBalance(transactionData)
  const categoryResultAll = handleMostSpentCategory(transactionData)

  const wallet = shortNumber(Allresult.total)
  const monthlyBalance = shortNumber(monthlyResult.total)
  const categoryResult = shortNumber(categoryResultAll.total)
  return (
    <>
      <CardValue
        description="Carteira"
        icon={IoWalletOutline}
        side="left"
        value={`R$ ${wallet}`}
      />
      <CardValue
        description="Faturamento mensal"
        icon={TbMoneybag}
        side="right"
        value={`R$ ${monthlyBalance}`}
      />
      <CardValue
        description="Previsão de gastos"
        icon={MdOutlineMoneyOff}
        side="left"
        value={monthlyPreview.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      />
      <CardValue
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        side="right"
        value={`R$ ${categoryResult}`}
      />
    </>
  )
}
