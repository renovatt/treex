import Header from '@/app/components/Layout/Header'
import DoughnutChart from '@/app/components/ChartJS/PolarChart'
import ViewContainer from '@/app/components/Layout/ViewContainer'
import GridTransaction from '@/app/components/Grids/GridTransaction'
import TransactionTable from '@/app/components/Tables/TransactionTable'

export default function Transactions() {
  return (
    <ViewContainer>
      <Header title="Transações" description="Gastos recentes" />
      <section className="flex w-full flex-col justify-between gap-4 overflow-y-auto xl:flex-row xl:gap-10">
        <section className="flex w-full flex-col items-center justify-between gap-10 xl:w-8/12">
          <GridTransaction />
          <TransactionTable />
        </section>
        <aside className="bg-left-card-gradient flex w-full items-center justify-center rounded-3xl xl:w-1/3">
          <DoughnutChart />
        </aside>
      </section>
    </ViewContainer>
  )
}
