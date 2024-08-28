'use client'
import { motion } from 'framer-motion'
import { TbLetterX } from 'react-icons/tb'

type HeaderFormProps = {
  title: string
  description: string
}

export default function HeaderForm({ description, title }: HeaderFormProps) {
  return (
    <>
      <span className="flex items-center justify-center gap-1 self-start">
        <h1 className="text-3xl font-bold">Tree</h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TbLetterX className="size-10 rounded bg-primary p-1 text-muted" />
        </motion.div>
      </span>

      <section className="self-start py-2 pb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="text-xs text-muted-foreground">{description}</span>
      </section>
    </>
  )
}
