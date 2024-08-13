import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import CriptoCards from '@/components/features/cripto/cripto-cards'
import Overview from '@/components/features/cripto/overview'

export const metadata: Metadata = {
  title: 'TreeX | Cripto',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default function Page() {
  return (
    <ViewContainer>
      <Header title="Cripto" description="Mundo cripto" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-5">
          <section className="w-full space-y-5">
            <CriptoCards />
            <Overview />
          </section>
        </section>
      </section>
    </ViewContainer>
  )
}