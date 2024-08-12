import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import CriptoAside from '@/components/features/cripto-aside'

export const metadata: Metadata = {
  title: 'TreeX | Cripto',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default function Dashboard() {
  return (
    <ViewContainer>
      <Header title="Cripto" description="Mundo cripto" />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-10">
          <CriptoAside />
        </section>
      </section>
    </ViewContainer>
  )
}
