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
      />
      <TransactionItemList
        date="01/11/2023"
        icon={HiArrowTrendingDown}
        title="Faculdade"
        value={200}
      />
      <TransactionItemList
        date="26/09/2023"
        icon={HiArrowTrendingUp}
        title="Comida"
        value={2300}
      />
      <TransactionItemList
        date="06/12/2023"
        icon={HiArrowTrendingUp}
        title="Salário"
        value={2300}
      />
      <TransactionItemList
        date="01/11/2023"
        icon={HiArrowTrendingDown}
        title="Faculdade"
        value={200}
      />
      <TransactionItemList
        date="26/09/2023"
        icon={HiArrowTrendingUp}
        title="Comida"
        value={2300}
      />
    </TransactionTableContainer>
  )
}
