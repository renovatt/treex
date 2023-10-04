import Header from '@/app/components/Header'

export default function Notes() {
  return (
    <section className="flex w-full flex-col">
      <Header title="Anotações" description="Despesas e metas" />
      <section className="flex gap-5">
        <h1 className="text-white">Anotações</h1>
      </section>
    </section>
  )
}
