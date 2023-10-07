'use client'
import useSideBarStore from '@/store'
import RouterLink from '../RouterLink'
import { TbTransfer } from 'react-icons/tb'
import { FaRegNoteSticky } from 'react-icons/fa6'
import { AiOutlineDashboard } from 'react-icons/ai'

export default function Navbar() {
  const { status } = useSideBarStore()

  return (
    <nav className="flex w-full items-center justify-center md:items-start">
      <ul className="flex w-full items-center justify-start gap-2 px-4 md:mt-14 md:flex-col">
        <RouterLink
          href="/"
          icon={AiOutlineDashboard}
          isOpen={status.isSelected}
          name="Dashboard"
        />
        <RouterLink
          href="/views/transactions"
          icon={TbTransfer}
          isOpen={status.isSelected}
          name="Transações"
        />
        <RouterLink
          href="/views/notes"
          icon={FaRegNoteSticky}
          isOpen={status.isSelected}
          name="Anotações"
        />
      </ul>
    </nav>
  )
}
