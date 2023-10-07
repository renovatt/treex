'use client'
import Header from '@/app/components/Header'
import MonthPreview from '@/app/components/MonthPreview'
import PriorityPreview from '@/app/components/PriorityPreview'

export default function Notes() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden md:items-start">
      <Header title="Anotações" description="Despesas e metas" />
      <section className="flex w-full flex-col items-center justify-start gap-4 xl:flex-row">
        <MonthPreview />
        <PriorityPreview />
      </section>
    </section>
  )
}
