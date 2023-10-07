import Header from '@/app/components/Header'
import GridTransaction from '@/app/components/GridTransaction'
import TransactionTable from '@/app/components/TransactionTable'
import DoughnutChart from '@/app/components/PolarChart'

export default function Transactions() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden pb-20 md:items-start md:p-0">
      <Header title="Transações" description="Gastos recentes" />
      <section className="flex w-full flex-col justify-between gap-4 xl:flex-row xl:gap-10">
        <section className="flex w-full flex-col items-center justify-between gap-10 xl:w-8/12">
          <GridTransaction />
          <TransactionTable />
        </section>
        <aside className="bg-left-card-gradient flex w-full items-center justify-center rounded-3xl xl:w-1/3">
          <DoughnutChart />
        </aside>
      </section>
    </section>
  )
}
