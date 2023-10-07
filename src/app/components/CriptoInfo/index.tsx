'use client'
import { BiLogoBitcoin } from 'react-icons/bi'
import PreviewCardValue from '../PreviewCardValue'
import CriptoItemList from '../Tables/CriptoItemList'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

export default function CriptoInfo() {
  return (
    <aside className="flex h-full w-full flex-col items-center justify-start gap-5 xl:w-1/3">
      <h2 className="self-start text-xs text-primary-800">
        Dolar nos últimos 7 dias
      </h2>

      <div className="h-56 w-full rounded-xl bg-white xl:h-40"></div>

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
