import Header from './components/Header'
import { BiTransfer } from 'react-icons/bi'
import PreviewCard from './components/PreviewCard'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff } from 'react-icons/md'

export default function Home() {
  return (
    <section className="flex w-full flex-col">
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex gap-5">
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
      </section>
    </section>
  )
}
