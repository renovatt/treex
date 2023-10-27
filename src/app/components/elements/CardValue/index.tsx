'use client'
import { DashCardProps } from './types'
import { PiEyeSlash } from 'react-icons/pi'
import { IoEyeSharp } from 'react-icons/io5'
import { useToggle } from '@/hooks/useToogle'

export default function CardValue({
  description,
  icon: Icon,
  side,
  value,
}: DashCardProps) {
  const { isOpen, toggleModal } = useToggle()
  return (
    <section
      className={`${
        side === 'left'
          ? 'dark:bg-left-card-gradient bg-white'
          : 'dark:bg-right-card-gradient bg-white'
      } flex h-32 w-32 flex-col items-start justify-center gap-3 rounded-3xl px-5 shadow-lg md:h-36 md:w-36`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <Icon className="h-8 w-8 text-primary-800" />
        {isOpen ? (
          <IoEyeSharp
            onClick={toggleModal}
            className="h-5 w-5 text-primary-800 hover:cursor-pointer"
          />
        ) : (
          <PiEyeSlash
            onClick={toggleModal}
            className="h-5 w-5 text-primary-800 hover:cursor-pointer"
          />
        )}
      </div>
      <h1 className="text-xs text-primary-800 md:text-base">{description}</h1>
      <span
        className={`${
          isOpen
            ? 'text-black dark:text-white'
            : 'rounded-lg bg-primary-800 text-transparent opacity-10'
        } w-full text-xs font-bold md:text-base`}
      >
        {value}
      </span>
    </section>
  )
}
