'use client'
import Header from '@/app/components/Layout/Header'
import { TbReportMoney } from 'react-icons/tb'
import PreviewCardValue from '@/app/components/Cards/PreviewCardValue'
import PreviewMonthyCard from '@/app/components/Cards/PreviewMonthyCard'
import PreviewPriorityCard from '@/app/components/Cards/PreviewPriorityCard'

export default function Notes() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden pb-20 md:items-start md:p-0">
      <Header title="Anotações" description="Despesas e metas" />
      <section className="flex w-full flex-col items-start justify-center gap-4">
        <PreviewCardValue
          description="Total"
          icon={TbReportMoney}
          side="left"
          value={3500}
        />
        <section className="flex w-full flex-col items-center justify-start gap-4 xl:flex-row">
          <PreviewMonthyCard />
          <PreviewPriorityCard />
        </section>
      </section>
    </section>
  )
}
