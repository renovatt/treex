'use client'
import dynamic from 'next/dynamic'
import CardValue from '@elements/CardValue'
import { useGetDolar } from '@/hooks/useGetDolar'
import { useGetCrypto } from '@/hooks/useGetCrypto'
import CriptoItemList from '@elements/CriptoItemList'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { CriptoCoinTypeProps } from '@elements/CriptoItemList/types'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import WalletCardDolar from '../PreviewCards/WalletDolar'

export default function CriptoAside() {
  const Candlestick = dynamic(() => import('@elements/ChartJS/Candlestick'), {
    ssr: false,
  })

  const { data: dolar } = useGetDolar()
  const [user, loading] = useAuthState(auth)
  const { data, isError, isLoading } = useGetCrypto()
  const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

  useEffect(() => {
    if (user) {
      setUserLoaded(user as UserData)
    }
  }, [user])

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
          {userLoaded && !loading ? (
            <WalletCardDolar user={userLoaded} />
          ) : (
            <CardValue
              description="Dolar saldo"
              icon={RiMoneyDollarCircleLine}
              side="left"
              value={'0'}
            />
          )}
          <CardValue
            description="Dolar hoje"
            icon={LiaMoneyBillWaveSolid}
            side="right"
            value={Number(dolar?.data.USDBRL.high).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
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
