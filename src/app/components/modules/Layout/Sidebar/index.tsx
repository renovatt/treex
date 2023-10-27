'use client'
import useSideBarStore from '@/store'
import { SidebarProps } from './types'
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md'
import Navbar from '../../Navigation/Navbar'
import SidebarContainer from '../SidebarContainer'

export default function Sidebar({ children }: SidebarProps) {
  const { status, setStatus } = useSideBarStore()
  return (
    <SidebarContainer>
      <aside
        className={`fixed bottom-0 left-0 z-50 flex h-20 w-full border border-x-transparent border-t-primary-800 bg-primary-650 shadow-lg shadow-primary-900 transition-all ease-in-out dark:border-t-primary-850 dark:bg-primary-900 md:relative md:h-full md:border-y-transparent md:border-r-primary-800 md:shadow-none md:dark:border-r-primary-850 ${
          status.isSelected ? 'md:w-48' : 'md:w-20'
        }`}
      >
        {status.isSelected ? (
          <MdOutlineKeyboardDoubleArrowLeft
            className="absolute -right-[5px] top-5 hidden h-3 w-3 rounded-full bg-primary-850 text-primary-650 hover:cursor-pointer dark:text-primary-750 md:flex"
            onClick={setStatus}
          />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight
            className="absolute -right-[5px] top-5 hidden h-3 w-3 rounded-full bg-primary-850 text-primary-650 hover:cursor-pointer dark:text-primary-750 md:flex"
            onClick={setStatus}
          />
        )}
        <Navbar />
      </aside>

      <main className="flex flex-grow flex-col items-start justify-start px-4 py-2">
        {children}
      </main>
    </SidebarContainer>
  )
}
