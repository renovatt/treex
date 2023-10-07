import Header from './components/Layout/Header'
import BarChart from './components/ChartJS/BarChart'
import CriptoInfo from './components/CriptoInfo'
import GridDash from './components/Grids/GridDash'
import TransactionTable from './components/Tables/TransactionTable'

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden pb-20 md:items-start md:p-0">
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-10 xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-5 xl:w-8/12">
          <GridDash />
          <BarChart />
          <TransactionTable />
        </section>
        <CriptoInfo />
      </section>
    </section>
  )
}
