'use client'
import { motion } from 'framer-motion'
import { SidebarContainerProps } from './types'

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container relative flex h-screen overflow-hidden border border-primary-850 bg-primary-650 shadow-xl dark:bg-primary-900 2xl:rounded-xl"
      >
        {children}
      </motion.section>
    </main>
  )
}
