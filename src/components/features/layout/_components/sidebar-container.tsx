'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function SidebarContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex h-screen w-full overflow-hidden"
      >
        {children}
      </motion.section>
    </div>
  )
}
