import { Metadata } from 'next'
// import dynamic from 'next/dynamic'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import GridTransactions from '@/components/features/grid-transactions'
import TransactionTable from '@/components/features/table/transaction-table'

export const metadata: Metadata = {
  title: 'TreeX | Transações',
  description:
    'Obtenha uma visão dos seus faturamentos mensais ou diários, com a capacidade de filtrar por categorias e visualizar essas informações através de gráficos.',
}

export default function Transactions() {
  // const PolarChartPreloader = dynamic(
  //   () => import('@/components/features/charts/polar-chart-preloader'),
  //   {
  //     ssr: false,
  //   },
  // )
  return (
    <ViewContainer>
      <Header title="Transações" description="Gastos recentes" />
      <section className="flex w-full flex-col justify-between gap-4 overflow-y-auto xl:flex-row xl:gap-10">
        <section className="flex w-full flex-col items-center justify-between gap-10">
          <GridTransactions />
          <TransactionTable />
          {/* <PolarChartPreloader /> */}
        </section>
      </section>
    </ViewContainer>
  )
}
