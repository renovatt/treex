'use client'
import CountUp from 'react-countup'

export default function AnimatedValueCount({ value }: { value: number }) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1}
      separator="."
      decimals={4}
      decimal=","
      prefix="R$ "
      formattingFn={(val) =>
        val.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      }
    />
  )
}
