'use client'
import Navbar from '../Navbar'
import useSideBarStore from '@/store'
import { SidebarProps } from './types'
import SidebarContainer from '../SidebarContainer'
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md'

export default function Sidebar({ children }: SidebarProps) {
  const { status, setStatus } = useSideBarStore()
  return (
    <SidebarContainer>
      <aside
        className={`relative flex h-full bg-primary-900 transition-all ease-in-out ${
          status.isSelected ? 'w-48' : 'w-20'
        }`}
      >
        {status.isSelected ? (
          <MdOutlineKeyboardDoubleArrowLeft
            className="absolute -right-[5px] top-5 hidden h-3 w-3 rounded-full bg-primary-850 text-primary-750 hover:cursor-pointer md:flex"
            onClick={setStatus}
          />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight
            className="absolute -right-[5px] top-5 hidden h-3 w-3 rounded-full bg-primary-850 text-primary-750 hover:cursor-pointer md:flex"
            onClick={setStatus}
          />
        )}
        <Navbar />
      </aside>

      <main className="flex flex-grow flex-col items-start justify-start p-5">
        {children}
      </main>
    </SidebarContainer>
  )
}
