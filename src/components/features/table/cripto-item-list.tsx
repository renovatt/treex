'use client'
import { motion } from 'framer-motion'

export type CritpoItemList = {
  name: string
  currentPrice: string
  symbol: string
}

export type CriptoCoinTypeProps = {
  id: number
  name: string
  symbol: string
  slug: string
  quote: {
    USD: {
      price: string
    }
  }
}

export type CriptoCoinTypeResponse = {
  data: CriptoCoinTypeProps[]
}

export default function CriptoItemList({
  name,
  symbol,
  currentPrice,
}: CritpoItemList) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center justify-between rounded-lg p-2 py-4 shadow-sm"
    >
      <span className="flex items-center justify-center gap-2 text-muted-foreground">
        {name}
        <span className="text-muted-foreground opacity-50">({symbol})</span>
      </span>
      <span className="text-muted-foreground">{currentPrice}</span>
    </motion.li>
  )
}
