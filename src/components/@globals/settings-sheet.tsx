'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { auth } from '@/firebase'
import { LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { logout } from '@/lib/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { ModeToggle } from './dark-mode'

export function SettingsSheet() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const letter = `${user?.email?.charAt(0)}`
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${letter}`

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full">
          <Settings className="shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configurações</SheetTitle>
        </SheetHeader>

        <section className="my-5 flex flex-col items-end justify-between space-y-4">
          <section className="flex items-center gap-2">
            <section className="flex flex-col items-end">
              <p className="text-sm font-medium leading-none">
                {user?.displayName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </section>
            <Avatar>
              <AvatarImage src={avatar} alt="@avatar" />
              <AvatarFallback>WL</AvatarFallback>
            </Avatar>
          </section>

          <section className="flex w-full flex-col items-center space-y-20">
            <div className="flex w-full items-center justify-end gap-2">
              <span className="text-muted-foreground">Tema</span>
              <ModeToggle />
            </div>
          </section>
        </section>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={handleLogout}
              className="bottom-5 flex w-full items-center gap-2 border"
            >
              Sair
              <LogOut className="size-4" />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
