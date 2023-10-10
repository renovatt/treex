'use client'
import dynamic from 'next/dynamic'
import { BiLogoBitcoin } from 'react-icons/bi'
import CriptoItemList from '../Tables/CriptoItemList'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import PreviewCardValue from '../Cards/PreviewCardValue'

export default function CriptoInfo() {
  const Candlestick = dynamic(() => import('../ChartJS/Candlestick'), {
    ssr: false,
  })
  return (
    <aside className="flex h-full w-full flex-col items-center justify-start space-y-4 xl:w-1/3">
      <h2 className="self-start text-xs text-primary-800">
        Bitcoin em tempo real
      </h2>

      <section className="flex w-full flex-col items-center justify-center space-y-4">
        <section className="flex h-full min-h-[14rem] w-full items-center justify-center rounded-xl">
          <Candlestick />
        </section>

        <section className="flex w-full items-center justify-between">
          <PreviewCardValue
            description="Dolar saldo"
            icon={RiMoneyDollarCircleLine}
            side="left"
            value={500}
          />
          <PreviewCardValue
            description="Dolar hoje"
            icon={LiaMoneyBillWaveSolid}
            side="right"
            value={230}
          />
        </section>
      </section>

      <section className="w-full md:mb-4">
        <ul className="flex h-40 w-full flex-col items-center justify-start gap-2 overflow-scroll overflow-x-hidden md:h-72">
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
          <CriptoItemList
            cripto="Bitcoin"
            icon={BiLogoBitcoin}
            mark="BTC"
            value="135,230,00"
          />
        </ul>
      </section>
    </aside>
  )
}
