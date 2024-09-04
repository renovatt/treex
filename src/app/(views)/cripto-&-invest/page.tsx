import { Metadata } from 'next'
import { Suspense } from 'react'
import ViewContainer from '@/features/layout/_components/view-container'
import Header from '@/features/layout/_components/header'
import Overview from '@/features/cripto/_components/overview'
// import { getBrapiStockList } from '@/services/brapi.service'

export const metadata: Metadata = {
  title: 'TreeX | Cripto & Inest',
  description:
    'Obtenha uma visão abrangente de sua situação financeira, acompanhada por gráficos personalizados que representam seus rendimentos.',
}

export default async function Page() {
  // const quoteData = await getBrapiStock('PETR4')
  // const stockList = await getBrapiStockList()
  // console.log(stockList)

  return (
    <ViewContainer>
      <Header
        title="Cripto & Invest"
        description="Cripto e bolsas de valores"
      />
      <section className="flex w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden xl:flex-row">
        <section className="flex w-full flex-col items-center justify-start gap-5">
          <section className="w-full space-y-5">
            <Suspense fallback={<div>Carregando...</div>}>
              <Overview />
            </Suspense>
          </section>
        </section>
      </section>
    </ViewContainer>
  )
}
