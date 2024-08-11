'use client'
import { motion } from 'framer-motion'
import { HeaderFormProps } from './type'
import { TbLetterX } from 'react-icons/tb'

export default function HeaderForm({ description, title }: HeaderFormProps) {
  return (
    <>
      <span className="flex items-center justify-center gap-1 self-start">
        <h1 className="text-3xl font-bold text-primary-900">Tree</h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TbLetterX className="h-10 w-10 bg-primary-900 p-1 text-primary-750" />
        </motion.div>
      </span>

      <section className="self-start py-2 pb-4">
        <h1 className="text-xl font-bold text-primary-900">{title}</h1>
        <span className="text-xs text-primary-800">{description}</span>
      </section>
    </>
  )
}
