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
      } flex h-32 w-32 flex-col items-start justify-center gap-3 rounded-3xl px-5 md:h-36 md:w-36`}
    >
      <Icon className="h-8 w-8 text-primary-800" />
      <h1 className="text-xs text-primary-800 md:text-base">{description}</h1>
      <span className="text-xs font-bold text-white md:text-base">
        R$ {value}
      </span>
    </section>
  )
}
