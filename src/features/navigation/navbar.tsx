'use client'
import useSideBarStore from '@/store/use-sidebar-store'
import RouterLink from './router-link'
import { House, ArrowRightLeft, Bitcoin } from 'lucide-react'
import AddButton from '@/components/@globals/add-button'
import { IoCardOutline } from 'react-icons/io5'

export default function Navbar() {
  const { status } = useSideBarStore()

  return (
    <nav className="flex w-full items-center justify-center md:items-start">
      <ul className="flex w-full items-center justify-start gap-2 px-2 md:mt-14 md:flex-col">
        <RouterLink
          href="/dashboard"
          icon={House}
          isOpen={status.isSelected}
          name="Home"
        />
        <RouterLink
          href="/transactions"
          icon={ArrowRightLeft}
          isOpen={status.isSelected}
          name="Transações"
        />
        <div className="block md:hidden">
          <AddButton />
        </div>
        <RouterLink
          href="/notes"
          icon={IoCardOutline}
          isOpen={status.isSelected}
          name="Despesas"
        />
        <RouterLink
          href="/cripto-&-invest"
          icon={Bitcoin}
          isOpen={status.isSelected}
          name="Cripto & Invest"
        />
      </ul>
    </nav>
  )
}
