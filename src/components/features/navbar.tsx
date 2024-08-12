'use client'
import useSideBarStore from '@/store'
import { TbTransfer } from 'react-icons/tb'
import { FaRegNoteSticky, FaBitcoin } from 'react-icons/fa6'
import { AiOutlineDashboard } from 'react-icons/ai'
import RouterLink from './router-link'

export default function Navbar() {
  const { status } = useSideBarStore()

  return (
    <nav className="flex w-full items-center justify-center md:items-start">
      <ul className="flex w-full items-center justify-start gap-2 px-4 md:mt-14 md:flex-col">
        <RouterLink
          href="/dashboard"
          icon={AiOutlineDashboard}
          isOpen={status.isSelected}
          name="Dashboard"
        />
        <RouterLink
          href="/transactions"
          icon={TbTransfer}
          isOpen={status.isSelected}
          name="Transações"
        />
        <RouterLink
          href="/notes"
          icon={FaRegNoteSticky}
          isOpen={status.isSelected}
          name="Anotações"
        />
        <RouterLink
          href="/cripto"
          icon={FaBitcoin}
          isOpen={status.isSelected}
          name="Mundo Cripto"
        />
      </ul>
    </nav>
  )
}
