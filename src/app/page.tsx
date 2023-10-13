'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { TbLetterX } from 'react-icons/tb'

export default function Home() {
  const route = useRouter()

  useEffect(() => {
    setTimeout(() => {
      route.push('/login')
    }, 3000)
  }, [route])

  return (
    <section className="flex h-screen w-screen items-center justify-center bg-primary-900">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <TbLetterX className="h-10 w-10 border border-white bg-primary-900 p-1 text-primary-750" />
      </motion.div>
    </section>
  )
}
