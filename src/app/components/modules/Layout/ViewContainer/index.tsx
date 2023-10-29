'use client'
import { motion } from 'framer-motion'
import { ViewContainerProps } from './types'

export default function ViewContainer({ children }: ViewContainerProps) {
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
