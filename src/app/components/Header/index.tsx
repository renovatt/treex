'use client'
import Image from 'next/image'
import { HeaderProps } from './types'
import AddTransactionModal from '../AddTransactionModal'
import { useToggle } from '@/hooks/useToogle'
import { MdKeyboardArrowDown, MdOutlineAddBox } from 'react-icons/md'

export default function Header({ title, description }: HeaderProps) {
  const { isOpen, openModal, closeModal } = useToggle()
  return (
    <>
      <AddTransactionModal isOpen={isOpen} closeModal={closeModal} />
      <header className="my-5 mb-10 flex w-full items-center justify-between">
        <article className="flex flex-col items-start justify-center">
          <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
          <span className="text-xs text-primary-800">{description}</span>
        </article>

        <section className="flex items-center justify-between gap-2">
          <section
            onClick={openModal}
            className="mr-2 flex items-center justify-center text-primary-800 transition-all ease-in-out hover:cursor-pointer hover:text-primary-750"
          >
            <MdOutlineAddBox className="h-6 w-6" />
            <span className="flex select-none items-center justify-center pl-2 text-xs md:text-base">
              Adicionar
            </span>
          </section>
          <figure className="h-8 w-8 select-none rounded-full bg-white">
            <Image
              src={'https://avatars.githubusercontent.com/u/94547135?v=4'}
              alt="user-image"
              className="h-full w-full rounded-full bg-white object-cover"
              width={500}
              height={500}
              priority
            />
          </figure>
          <span className="hidden items-center justify-center text-primary-800 md:flex">
            Wildemberg
          </span>
          <MdKeyboardArrowDown className="h-5 w-5 text-primary-800 hover:cursor-pointer" />
        </section>
      </header>
    </>
  )
}
