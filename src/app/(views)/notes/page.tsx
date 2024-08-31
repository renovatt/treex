import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/_components/view-container'
import Header from '@/components/features/layout/_components/header'
import Overview from '@/components/features/notes/_components/overview'
import GridNotes from '@/components/features/notes/_components/grid-notes'

export const metadata: Metadata = {
  title: 'TreeX | Anotações',
  description:
    'Mantenha uma lista atualizada dos seus gráficos de previsão mensal e da sua lista de prioridades.',
}

export default function Page() {
  return (
    <ViewContainer>
      <Header title="Anotações" description="Despesas e prioridades" />
      <section className="flex w-full flex-col items-start justify-start gap-4 overflow-y-auto">
        <section className="w-full space-y-5">
          <GridNotes />
          <Overview />
        </section>
      </section>
    </ViewContainer>
  )
}
