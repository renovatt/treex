'use client'
import Link from 'next/link'
import { LinkRouteProps } from './types'
import { usePathname } from 'next/navigation'

export default function RouterLink({
  href,
  name,
  icon: Icon,
  isOpen,
}: LinkRouteProps) {
  const params = usePathname()
  const isActive = params === href

  return (
    <Link
      href={href}
      className={`flex h-10 w-full items-center justify-center gap-5 rounded-lg transition-all ease-in-out hover:cursor-pointer hover:bg-white dark:hover:bg-primary-850 dark:hover:text-primary-750 ${
        isActive
          ? 'bg-white text-primary-800 shadow-md dark:bg-primary-850 dark:text-primary-750'
          : 'text-primary-800'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className={`w-26 text-xs ${isOpen ? 'flex' : 'hidden'}`}>
        {name}
      </span>
    </Link>
  )
}
