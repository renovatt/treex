'use client'
import { motion } from 'framer-motion'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen w-screen items-center justify-center"
    >
      {children}
    </motion.section>
  )
}
