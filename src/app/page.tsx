import Header from './components/Layout/Header'
import CriptoInfo from './components/CriptoInfo'
import GridDash from './components/Grids/GridDash'
import BarChart from './components/ChartJS/BarChart'
import ViewContainer from './components/Layout/ViewContainer'
import TransactionTable from './components/Tables/TransactionTable'

export default function Home() {
  return (
    <ViewContainer>
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-10 xl:w-8/12">
          <GridDash />
          <BarChart />
          <TransactionTable />
        </section>
        <CriptoInfo />
      </section>
    </ViewContainer>
  )
}
