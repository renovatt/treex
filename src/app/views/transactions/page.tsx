import Header from '@/app/components/Header'
import TransactionItemList from '@/app/components/TransactionItemList'
import PreviewCard from '@/app/components/PreviewCard'
import TransactionTableContainer from '@/app/components/TransactionTableContainer'
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiArrowsUpDown,
} from 'react-icons/hi2'

export default function Transactions() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden md:items-start">
      <Header title="Transações" description="Gastos recentes " />
      <section className="grid grid-cols-2 gap-10 md:w-1/2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
