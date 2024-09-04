'use client'
import { auth } from '@/firebase'
import { logout } from '@/firebase/database/auth'
// import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import {
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export default function UserDropdown() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  // const { setTheme } = useTheme()
  const letter = `${user?.email?.charAt(0)}`
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${letter}`

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={avatar} alt="@avatar" />
            <AvatarFallback>WL</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem
            className="flex w-full items-center justify-between"
            onClick={() => setTheme('light')}
          >
            <span>Light</span>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full items-center justify-between"
            onClick={() => setTheme('dark')}
          >
            <span>Dark</span>
            <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleLogout}>
            Sair
            <DropdownMenuShortcut>
              <LogOut className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
