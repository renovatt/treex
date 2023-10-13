'use client'
import { motion } from 'framer-motion'
import { SidebarContainerProps } from './types'

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container relative flex h-screen overflow-hidden rounded-xl border border-primary-850 bg-primary-900 shadow-xl"
      >
        {children}
      </motion.section>
    </main>
  )
}
