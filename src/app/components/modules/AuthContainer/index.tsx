'use client'
import ThumbSlider from '../SwiperThumb'
import { AuthContainerProps } from './types'
import { LiaCopyright } from 'react-icons/lia'
import { motion } from 'framer-motion'

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <section className="container relative flex h-[95%] w-[90%] items-center justify-center gap-2 overflow-hidden rounded-3xl bg-white p-4 lg:justify-between">
      <ThumbSlider />
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
        <LiaCopyright className="text-xs text-primary-800" />
        <span className="text-xs text-primary-800">
          2023 Desenvolvido por renovatt
        </span>
      </span>
    </section>
  )
}
