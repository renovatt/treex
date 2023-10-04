'use client'
import Header from './components/Header'
import { BiTransfer } from 'react-icons/bi'
import PreviewCard from './components/PreviewCard'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff } from 'react-icons/md'
import ChartJSY from './components/ChartJSY'

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-center md:items-start">
      <Header title="Dashboard" description="Visão geral" />
      <section className="grid grid-cols-2 gap-10 md:grid-cols-4">
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
    </section>
  )
}
