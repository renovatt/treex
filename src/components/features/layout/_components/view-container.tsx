'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function ViewContainer({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full flex-col items-center justify-start overflow-hidden overflow-y-auto pb-20 md:items-start md:p-0"
    >
      {children}
    </motion.section>
  )
}
