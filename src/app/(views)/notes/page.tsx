import { Metadata } from 'next'
import Header from '@modules/Layout/Header'
import GridNotes from '@modules/Grids/GridNotes'
import ViewContainer from '@modules/Layout/ViewContainer'
import PreviewMonthyCard from '@modules/PreviewMonthyCard'
import PreviewPriorityCard from '@modules/PreviewPriorityCard'

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
