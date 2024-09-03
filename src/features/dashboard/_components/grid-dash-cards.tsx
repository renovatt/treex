'use client'
import { TbMoneybag } from 'react-icons/tb'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import { calculateWallet } from '../utils/calculate-wallet'
import { calculateExpensesForecast } from '@/utils/calculate-expenses-forecast'
import { calculateMostSpentCategory } from '../utils/calculate-most-spent-category'
import { calculateCurrentMonthlyRevenue } from '../utils/calculate-current-monthly-revenue'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import WalletCard from '@/components/@globals/wallet-card'
import { calculateGeneralCategoryPercentages } from '../utils/calculate-general-category-percentages'
import { calculateBalancesToCards } from '../utils/calculate-balance-to-cards'

export default function GridDashCards() {
  const { transactionData } = useGetTransactions()
  const { monthlyData } = useGetMonthly()

  const wallet = calculateWallet(transactionData)
  const monthlyRevenue = calculateCurrentMonthlyRevenue(transactionData)
  const expensesForecast = calculateExpensesForecast(monthlyData)
  const categoryRevenue = calculateMostSpentCategory(transactionData)

  const { general, currentMonth } = calculateBalancesToCards(
    transactionData || [],
  )

  const categoryPercentages = calculateGeneralCategoryPercentages(
    transactionData || [],
  )

  const generalBal = general.income + general.expenses
  const monthyBal = currentMonth.income + currentMonth.expenses

  const incomePercentage =
    generalBal !== 0
      ? ((general.income - general.expenses) / generalBal) * 100
      : 0

  const monthPercentage =
    monthyBal !== 0
      ? ((currentMonth.income - currentMonth.expenses) / monthyBal) * 100
      : 0

  const walletDesc = `${
    transactionData.length > 0 ? `${incomePercentage.toFixed(2)}%` : '0%'
  } em relação ao saldo.`

  const monthlyDesc = `${
    transactionData.length > 0 ? `${monthPercentage.toFixed(2)}%` : '0%'
  } nesse mês`

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
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <WalletCard
        title="Carteira"
        description={walletDesc}
        icon={IoWalletOutline}
        value={wallet.total}
      />
      <WalletCard
        title="Faturamento mensal"
        description={monthlyDesc}
        icon={TbMoneybag}
        value={monthlyRevenue.total}
      />
      <WalletCard
        title="Despesas fixas"
        description="Estimativa de gastos para o mês"
        icon={MdOutlineMoneyOff}
        value={expensesForecast}
      />
      <WalletCard
        title="Categoria mais gasta"
        description={mostSpentCategoryDesc}
        icon={MdOutlineCategory}
        value={categoryRevenue.total}
      />
    </section>
  )
}
