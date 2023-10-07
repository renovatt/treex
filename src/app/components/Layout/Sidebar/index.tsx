'use client'
import Navbar from '../../Navigation/Navbar'
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
        className={`fixed bottom-0 left-0 z-50 flex h-20 w-full border border-x-transparent border-t-primary-850 bg-primary-900 shadow-lg shadow-primary-900 transition-all ease-in-out md:relative md:h-full md:border-y-transparent md:border-r-primary-850 md:shadow-none ${
          status.isSelected ? 'md:w-48' : 'md:w-20'
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
