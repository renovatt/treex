'use client'
import { TbMoneybag } from 'react-icons/tb'
import CardValue from '@elements/CardValue'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'

export default function GridDash() {
  return (
    <section className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
      <CardValue
        description="Carteira"
        icon={IoWalletOutline}
        side="left"
        value={'R$ 3500'}
      />
      <CardValue
        description="Faturamento mensal"
        icon={TbMoneybag}
        side="right"
        value={'R$ 3500'}
      />
      <CardValue
        description="Previsão de gastos"
        icon={MdOutlineMoneyOff}
        side="left"
        value={'R$ 3500'}
      />
      <CardValue
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        side="right"
        value={'R$ 3500'}
      />
    </section>
  )
}
