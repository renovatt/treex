'use client'
import Header from './components/Header'
import ChartJSY from './components/ChartJSY'
import CriptoInfo from './components/CriptoInfo'
import GridPreviewCards from './components/GridPreviewCards'
import TransactionTable from './components/TransactionTable'

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-scroll overflow-x-hidden md:items-start">
      <Header title="Dashboard" description="Visão geral" />
      <section className="flex w-full flex-col justify-between gap-4 xl:flex-row">
        <section className="flex w-full flex-col items-center justify-center xl:w-8/12">
          <GridPreviewCards />
          <ChartJSY />
          <TransactionTable />
        </section>
        <CriptoInfo />
      </section>
    </section>
  )
}
