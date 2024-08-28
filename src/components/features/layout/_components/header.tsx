'use client'
import { MdOutlineAddBox } from 'react-icons/md'
import CreateAndEditTransactionForm from '../../transactions/_components/create-and-edit-transaction-form'
import { ModeToggle } from '../../../@globals/dark-mode'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import { useDateStore } from '@/store'
import { cn } from '@/lib/utils'
import { CalendarIcon, Eye, EyeOff } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import UserDropdown from '@/components/@globals/user-dropdown'
import useHideStore from '@/store/use-hide-store'

type HeaderProps = {
  title: string
  description: string
}

export default function Header({ title, description }: HeaderProps) {
  const [date, setSelectedDate] = useState<Date | undefined>(new Date())
  const { setDate } = useDateStore()
  const { status, setIsHidden } = useHideStore()

  useEffect(() => {
    if (date) {
      setDate(date.toISOString().slice(0, 10))
    } else {
      setDate('')
    }
  }, [date, setDate])

  return (
    <header className="my-5 mb-10 flex w-full items-center justify-between">
      <section className="flex items-start justify-center gap-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-primary md:text-2xl">
            {title}
          </h1>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
        {status.hidden ? (
          <EyeOff
            onClick={() => {
              setIsHidden()
            }}
            className="ml-3 mt-1 size-6 cursor-pointer"
          />
        ) : (
          <Eye
            onClick={() => {
              setIsHidden()
            }}
            className="ml-3 mt-1 size-6 cursor-pointer"
          />
        )}
      </section>

      <section className="flex items-center justify-between gap-4">
        {title === 'Transações' ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'hidden justify-start text-left font-normal md:flex lg:w-[240px]',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, 'PPP', { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={ptBR}
                mode="single"
                selected={date}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : (
          ''
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="space-x-2">
              <MdOutlineAddBox className="size-6 sm:size-4" />
              <span className="hidden sm:block">Adicionar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="items-start">
              <DialogTitle>Adicionar transação</DialogTitle>
            </DialogHeader>
            <CreateAndEditTransactionForm />
          </DialogContent>
        </Dialog>
        <UserDropdown />
        <ModeToggle />
      </section>
    </header>
  )
}
