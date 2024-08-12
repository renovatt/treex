import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import CriptoAside from '@/components/features/cripto-aside'
import GridDash from '@/components/features/grid-dash'
import TransactionTable from '@/components/features/table/transaction-table'

export const metadata: Metadata = {
  title: 'TreeX | Dashboard',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default function Dashboard() {
  const BarChartPreloader = dynamic(
    () => import('@/components/features/charts/bar-chart-preloader'),
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
