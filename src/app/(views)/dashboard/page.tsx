import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@modules/Layout/Header'
import CriptoAside from '@modules/CriptoAside'
import GridDash from '@modules/Grids/GridDash'
import TransactionTable from '@modules/TransactionTable'
import ViewContainer from '@modules/Layout/ViewContainer'

export const metadata: Metadata = {
  title: 'TreeX | Dashboard',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default function Dashboard() {
  const BarChartPreloader = dynamic(
    () => import('@/app/components/elements/ChartJS/BarChartPreloader'),
    {
      ssr: false,
    },
  )
  return (
    <ViewContainer>
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-10 xl:w-8/12">
          <GridDash />
          <BarChartPreloader />
          <TransactionTable />
        </section>
        <CriptoAside />
      </section>
    </ViewContainer>
  )
}
