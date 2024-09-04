'use client'
import { LiaCopyright } from 'react-icons/lia'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'
import SwiperThumb from '@/components/@globals/swiper-thumb'

export default function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex size-full items-center justify-center gap-2 overflow-hidden border p-4 lg:justify-between">
      <SwiperThumb />
      <aside className="flex h-full w-full items-center justify-center rounded-3xl lg:w-1/2">
        <motion.section
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex w-96 flex-col space-y-6 p-2 lg:space-y-2"
        >
          {children}
        </motion.section>
      </aside>
      <span className="absolute bottom-2 flex items-center justify-center gap-1 lg:right-5">
        <LiaCopyright className="text-xs text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          2023 Desenvolvido por{' '}
          <Link
            className="hover:text-primary"
            href="https://www.linkedin.com/in/renovatt/"
            target="_blank"
          >
            @renovatt
          </Link>
        </span>
      </span>
    </section>
  )
}
