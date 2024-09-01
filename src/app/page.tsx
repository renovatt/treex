'use client'
import { auth } from '@/firebase'
import { motion } from 'framer-motion'
import { TbLetterX } from 'react-icons/tb'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)

  useEffect(() => {
    user ? router.push('/dashboard') : router.push('/login')
  }, [router, user])

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1, 0.9, 1, 1],
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
        <TbLetterX className="size-10 rounded bg-primary p-1 text-muted" />
      </motion.div>
    </section>
  )
}
