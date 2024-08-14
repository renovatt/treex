'use client'
import useSideBarStore from '@/store'
import RouterLink from './router-link'
import {
  LayoutDashboard,
  ArrowRightLeft,
  StickyNote,
  Bitcoin,
} from 'lucide-react'

export default function Navbar() {
  const { status } = useSideBarStore()

  return (
    <nav className="flex w-full items-center justify-center md:items-start">
      <ul className="flex w-full items-center justify-start gap-2 px-2 md:mt-14 md:flex-col">
        <RouterLink
          href="/dashboard"
          icon={LayoutDashboard}
          isOpen={status.isSelected}
          name="Dashboard"
        />
        <RouterLink
          href="/transactions"
          icon={ArrowRightLeft}
          isOpen={status.isSelected}
          name="Transações"
        />
        <RouterLink
          href="/cripto"
          icon={Bitcoin}
          isOpen={status.isSelected}
          name="Cripto"
        />
        <RouterLink
          href="/notes"
          icon={StickyNote}
          isOpen={status.isSelected}
          name="Anotações"
        />
      </ul>
    </nav>
  )
}