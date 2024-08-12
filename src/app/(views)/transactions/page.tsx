import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import GridTransactions from '@/components/features/transactions/grid-transactions'
import Overview from '@/components/features/transactions/overview'

export const metadata: Metadata = {
  title: 'TreeX | Transações',
  description:
    'Obtenha uma visão dos seus faturamentos mensais ou diários, com a capacidade de filtrar por categorias e visualizar essas informações através de gráficos.',
}

export default function Page() {
  return (
    <ViewContainer>
      <Header title="Transações" description="Gastos recentes" />
      <section className="flex w-full flex-col justify-between gap-4 overflow-y-auto xl:flex-row xl:gap-10">
        <section className="flex w-full flex-col items-center justify-between gap-5">
          <section className="w-full space-y-5">
            <Overview />
          </section>
          <GridTransactions />
        </section>
      </section>
    </ViewContainer>
  )
}
