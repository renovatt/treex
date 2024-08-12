'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { IconType } from 'react-icons'

type LinkRouteProps = {
  href: string
  name: string
  icon: IconType
  isOpen: boolean
}

export default function RouterLink({
  href,
  name,
  icon: Icon,
  isOpen,
}: LinkRouteProps) {
  const params = usePathname()
  const isActive = params === href

  return (
    <Link href={href} className="w-full">
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className="w-full space-x-4"
      >
        <Icon className="size-4" />
        <span
          className={`w-26 whitespace-nowrap text-xs ${isOpen ? 'flex' : 'hidden'}`}
        >
          {name}
        </span>
      </Button>
    </Link>
  )
}
