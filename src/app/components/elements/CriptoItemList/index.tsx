'use client'
import { CritpoItemList } from './types'
import { motion } from 'framer-motion'

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
      className="dark:bg-list-gradient flex w-full items-center justify-between rounded-lg bg-white p-2 py-4 shadow-sm dark:text-white"
    >
      <span className="flex items-center justify-center gap-2 text-primary-800 dark:text-primary-640">
        {name}
        <span className="text-primary-800 opacity-50 dark:text-primary-640">
          ({symbol})
        </span>
      </span>
      <span className="text-primary-800 dark:text-primary-640">
        {currentPrice}
      </span>
    </motion.li>
  )
}
