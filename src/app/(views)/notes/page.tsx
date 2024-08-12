import { Metadata } from 'next'
import ViewContainer from '@/components/features/layout/view-container'
import Header from '@/components/features/layout/header'
import PreviewMonthyCard from '@/components/features/cards/preview-monthy-card'
import PreviewPriorityCard from '@/components/features/cards/preview-priority-card'
import GridNotes from '@/components/features/grid-notes'

export const metadata: Metadata = {
  title: 'TreeX | Anotações',
  description:
    'Mantenha uma lista atualizada dos seus gráficos de previsão mensal e da sua lista de prioridades.',
}

export default function Notes() {
  return (
    <ViewContainer>
      <Header title="Anotações" description="Despesas e metas" />
      <section className="flex w-full flex-col items-start justify-start gap-4 overflow-y-auto">
        <GridNotes />
        <section className="flex w-full flex-col items-center justify-start gap-4 xl:flex-row">
          <PreviewMonthyCard />
          <PreviewPriorityCard />
        </section>
      </section>
    </ViewContainer>
  )
}
