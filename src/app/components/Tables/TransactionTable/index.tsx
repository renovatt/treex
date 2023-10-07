'use client'
import TransactionItemList from '../TransactionItemList'
import TransactionTableContainer from '../TransactionTableContainer'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function TransactionTable() {
  return (
    <TransactionTableContainer>
      <TransactionItemList
        date="06/12/2023"
        icon={HiArrowTrendingUp}
        title="Salário"
        value={2300}
        type="income"
      />
      <TransactionItemList
        date="01/11/2023"
        icon={HiArrowTrendingDown}
        type="expense"
        value={200}
        title="Remédio"
      />
      <TransactionItemList
        date="01/11/2023"
        icon={HiArrowTrendingDown}
        type="income"
        value={200}
        title="Freelancer"
      />
      <TransactionItemList
        date="26/09/2023"
        icon={HiArrowTrendingUp}
        title="Comida"
        value={2300}
        type="expense"
      />
      <TransactionItemList
        date="06/12/2023"
        icon={HiArrowTrendingUp}
        title="Salário"
        value={2300}
        type="income"
      />
      <TransactionItemList
        date="26/09/2023"
        icon={HiArrowTrendingUp}
        title="Comida"
        value={2300}
        type="expense"
      />
    </TransactionTableContainer>
  )
}
