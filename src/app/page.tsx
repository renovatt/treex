'use client'
import Header from './components/Header'
import { BiTransfer } from 'react-icons/bi'
import PreviewCard from './components/PreviewCard'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff } from 'react-icons/md'
import ChartJSY from './components/ChartJSY'
import TransactionTableContainer from './components/TransactionTableContainer'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import TransactionItemList from './components/TransactionItemList'

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden md:items-start">
      <Header title="Dashboard" description="Visão geral" />
      <section className="grid grid-cols-2 gap-10 md:w-1/2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <PreviewCard
          description="Carteira"
          icon={IoWalletOutline}
          side="left"
          value={3500}
        />
        <PreviewCard
          description="Faturamento mensal"
          icon={BiTransfer}
          side="right"
          value={510}
        />
        <PreviewCard
          description="Previsão de gastos"
          icon={MdOutlineMoneyOff}
          side="left"
          value={500}
        />
        <PreviewCard
          description="Alguma coisa"
          icon={MdOutlineMoneyOff}
          side="right"
          value={999}
        />
      </section>

      <ChartJSY />

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
    </section>
  )
}
