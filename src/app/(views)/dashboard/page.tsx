import { Metadata } from 'next'
import ViewContainer from '@/features/layout/_components/view-container'
import Header from '@/features/layout/_components/header'
import Overview from '@/features/dashboard/_components/overview'
import GridDashCards from '@/features/dashboard/_components/grid-dash-cards'

export const metadata: Metadata = {
  title: 'TreeX | Dashboard',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default function Page() {
  return (
    <ViewContainer>
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-5">
          <GridDashCards />
          <section className="w-full space-y-5">
            <Overview />
          </section>
        </section>
      </section>
    </ViewContainer>
  )
}
