'use client'
import { PiEyeSlash } from 'react-icons/pi'
import { IoEyeSharp } from 'react-icons/io5'
import { useToggle } from '@/hooks/useToogle'
import { IconType } from 'react-icons'

type DashCardProps = {
  icon: IconType
  value: string
  description: string
  side: 'left' | 'right'
}

export default function CardWallet({
  description,
  icon: Icon,
  // side,
  value,
}: DashCardProps) {
  const { isOpen, toggleModal } = useToggle()
  return (
    <section className="flex h-32 w-32 flex-col items-start justify-center gap-3 overflow-hidden rounded-3xl border px-5 md:h-36 md:w-36">
      <div className="flex w-full items-center justify-between gap-2">
        <Icon className="h-8 w-8 text-muted-foreground" />
        {isOpen ? (
          <IoEyeSharp
            onClick={toggleModal}
            className="h-5 w-5 text-muted-foreground hover:cursor-pointer"
          />
        ) : (
          <PiEyeSlash
            onClick={toggleModal}
            className="h-5 w-5 text-muted-foreground hover:cursor-pointer"
          />
        )}
      </div>
      <h1 className="text-xs text-muted-foreground md:text-base">
        {description}
      </h1>
      <span
        className={`${
          isOpen
            ? ''
            : 'rounded-lg bg-muted-foreground text-transparent opacity-10'
        } w-full text-xs font-bold md:text-base`}
      >
        {value}
      </span>
    </section>
  )
}
