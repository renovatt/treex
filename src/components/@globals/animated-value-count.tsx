'use client'
import { cn } from '@/lib/utils'
import CountUp from 'react-countup'

type Props = {
  value: number
  className?: string
}

export default function AnimatedValueCount({ value, className }: Props) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1}
      separator="."
      decimals={4}
      decimal=","
      prefix="R$ "
      className={cn(className)}
      formattingFn={(val) =>
        val.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      }
    />
  )
}
