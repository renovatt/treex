'use client'
import { motion } from 'framer-motion'
import { SidebarContainerProps } from './types'

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex h-screen w-full overflow-hidden border border-gray-300 bg-primary-650 shadow-xl dark:border-primary-850 dark:bg-primary-900"
      >
        {children}
      </motion.section>
    </main>
  )
}
