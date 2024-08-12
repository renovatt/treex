import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import GridWalletCards from '@/components/features/dashboard/grid-wallet-cards'
import Overview from '@/components/features/dashboard/overview'

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
          <GridWalletCards />
          <section className="w-full space-y-5">
            <Overview />
          </section>
        </section>
      </section>
    </ViewContainer>
  )
}
