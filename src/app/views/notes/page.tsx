'use client'
import { TbReportMoney } from 'react-icons/tb'
import Header from '@/app/components/Layout/Header'
import ViewContainer from '@/app/components/Layout/ViewContainer'
import PreviewCardValue from '@/app/components/Cards/PreviewCardValue'
import PreviewMonthyCard from '@/app/components/Cards/PreviewMonthyCard'
import PreviewPriorityCard from '@/app/components/Cards/PreviewPriorityCard'

export default function Notes() {
  return (
    <ViewContainer>
      <Header title="Anotações" description="Despesas e metas" />
      <section className="flex w-full flex-col items-start justify-start gap-4 overflow-y-auto">
        <section className="w-full">
          <PreviewCardValue
            description="Total"
            icon={TbReportMoney}
            side="left"
            value={3500}
          />
        </section>
        <section className="flex w-full flex-col items-center justify-start gap-4 xl:flex-row">
          <PreviewMonthyCard />
          <PreviewPriorityCard />
        </section>
      </section>
    </ViewContainer>
  )
}
