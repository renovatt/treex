'use client'
import PreviewCard from '../PreviewCard'
import { BiTransfer } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function GridTransaction() {
  return (
    <section className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
      <PreviewCard
        description="Total"
        icon={BiTransfer}
        side="left"
        value={3500}
      />
      <PreviewCard
        description="Entradas"
        icon={HiArrowTrendingUp}
        side="right"
        value={510}
      />
      <PreviewCard
        description="Saídas"
        icon={HiArrowTrendingDown}
        side="left"
        value={500}
      />
      <PreviewCard
        description="Categoria mais gasta"
        icon={MdOutlineCategory}
        side="left"
        value={500}
      />
    </section>
  )
}
