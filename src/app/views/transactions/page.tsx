import Header from '@/app/components/Header'
import PreviewCard from '@/app/components/PreviewCard'
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiArrowsUpDown,
} from 'react-icons/hi2'

export default function Transactions() {
  return (
    <section className="flex w-full flex-col items-center justify-center md:items-start">
      <Header title="Transações" description="Gastos recentes " />
      <section className="grid grid-cols-2 gap-10 md:grid-cols-4">
        <PreviewCard
          description="Total"
          icon={HiArrowsUpDown}
          side="left"
          value={3500}
        />
        <PreviewCard
          description="Entradas"
          icon={HiArrowTrendingUp}
          side="right"
          value={510}
        />
        <PreviewCard
          description="Saídas"
          icon={HiArrowTrendingDown}
          side="left"
          value={500}
        />
      </section>
    </section>
  )
}
