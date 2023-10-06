'use client'
import PreviewCard from '../PreviewCard'
import { TbMoneybag } from 'react-icons/tb'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'

export default function GridDash() {
  return (
    <section className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
      <PreviewCard
        description="Carteira"
        icon={IoWalletOutline}
        side="left"
        value={3500}
      />
      <PreviewCard
        description="Faturamento mensal"
        icon={TbMoneybag}
        side="right"
        value={510}
      />
      <PreviewCard
        description="Previsão de gastos"
        icon={MdOutlineMoneyOff}
        side="left"
        value={500}
      />
      <PreviewCard
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        side="right"
        value={230}
      />
    </section>
  )
}
