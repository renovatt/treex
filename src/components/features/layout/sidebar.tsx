'use client'
import useSideBarStore from '@/store'
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md'
import Navbar from '../navbar'
import SidebarContainer from './sidebar-container'
import { ReactNode } from 'react'

export default function Sidebar({ children }: { children: ReactNode }) {
  const { status, setStatus } = useSideBarStore()
  return (
    <SidebarContainer>
      <aside
        className={`fixed bottom-0 left-0 z-50 flex h-20 w-full border border-x-transparent border-r-muted border-t-muted transition-all ease-in-out md:relative md:h-full md:border-y-transparent md:border-r-muted ${
          status.isSelected ? 'md:w-60' : 'md:w-20'
        }`}
      >
        {status.isSelected ? (
          <MdOutlineKeyboardDoubleArrowLeft
            className="absolute -right-[5px] top-5 hidden size-3 rounded-full bg-primary text-muted hover:cursor-pointer md:flex"
            onClick={setStatus}
          />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight
            className="absolute -right-[5px] top-5 hidden size-3 rounded-full bg-primary text-muted hover:cursor-pointer md:flex"
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