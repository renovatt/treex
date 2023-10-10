import dynamic from 'next/dynamic'
import Header from './components/Layout/Header'
import CriptoInfo from './components/CriptoInfo'
import GridDash from './components/Grids/GridDash'
import ViewContainer from './components/Layout/ViewContainer'
import TransactionTable from './components/Tables/TransactionTable'

export default function Home() {
  const BarChart = dynamic(() => import('./components/ChartJS/BarChart'), {
    ssr: false,
  })
  return (
    <ViewContainer>
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
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
