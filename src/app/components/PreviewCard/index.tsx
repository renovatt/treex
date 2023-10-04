import React from 'react'
import { IconType } from 'react-icons'

type DashCardProps = {
  icon: IconType
  value: number
  description: string
  side: 'left' | 'right'
}

export default function PreviewCard({
  description,
  icon: Icon,
  side,
  value,
}: DashCardProps) {
  return (
    <section
      className={`${
        side === 'left' ? 'bg-left-card-gradient' : 'bg-right-card-gradient'
      } flex h-40 w-40 flex-col items-start justify-center gap-3 rounded-3xl px-5`}
    >
      <Icon className="h-8 w-8 text-primary-800" />
      <h1 className="text-base text-primary-800">{description}</h1>
      <span className="font-bold text-white">R$ {value}</span>
    </section>
  )
}
