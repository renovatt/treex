'use client'
import dynamic from 'next/dynamic'
import { useGetCrypto } from '@/hooks/useGetCrypto'
import CriptoItemList from '../Tables/CriptoItemList'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import PreviewCardValue from '../Cards/PreviewCardValue'
import { CriptoCoinTypeProps } from '../Tables/CriptoItemList/types'
import { useGetDolar } from '@/hooks/useGetDolar'

export default function CriptoInfo() {
  const Candlestick = dynamic(() => import('../ChartJS/Candlestick'), {
    ssr: false,
  })

  const { data: dolar } = useGetDolar()
  const { data, isError, isLoading } = useGetCrypto()

  const handleWalletToDolar = (walletValue: string) => {
    const rate = dolar?.data.USDBRL.bid
    const converted = Number(walletValue) / Number(rate)
    return converted.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
    <aside className="flex h-full w-full flex-col items-center justify-start space-y-6 xl:w-1/3 xl:space-y-4">
      <h2 className="self-start text-xs text-primary-800">
        Bitcoin em tempo real
      </h2>

      <section className="flex w-full flex-col items-center justify-center space-y-4">
        <section className="flex h-full min-h-[19rem] w-full items-center justify-center rounded-xl">
          <Candlestick />
        </section>

        <section className="flex w-full items-center justify-between">
          <PreviewCardValue
            description="Dolar saldo"
            icon={RiMoneyDollarCircleLine}
            side="left"
            value={handleWalletToDolar('3500')}
          />
          <PreviewCardValue
            description="Dolar hoje"
            icon={LiaMoneyBillWaveSolid}
            side="right"
            value={Number(dolar?.data.USDBRL.high).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          />
        </section>
      </section>

      <section className="w-full md:mb-4">
        <ul className="flex h-52 w-full flex-col items-center justify-start gap-2 overflow-scroll overflow-x-hidden md:h-72">
          {isError && (
            <h1 className="text-xs text-white">
              Dados não podem ser carregados
            </h1>
          )}

          {isLoading && (
            <h1 className="text-xs text-primary-800">Carregando..</h1>
          )}

          {data?.map((crypto: CriptoCoinTypeProps) => (
            <CriptoItemList
              key={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol.toUpperCase()}
              currentPrice={Number(crypto.quote.USD.price).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                },
              )}
            />
          ))}
        </ul>
      </section>
    </aside>
  )
}
