'use client'
import CardValue from '@elements/CardValue'
import { TbReportMoney } from 'react-icons/tb'

export default function GridNotes() {
  return (
    <section className="w-full">
      <CardValue
        description="Total"
        icon={TbReportMoney}
        side="left"
        value={'R$ 3500'}
      />
    </section>
  )
}
