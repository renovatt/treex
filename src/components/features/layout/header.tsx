'use client'
import { MdOutlineAddBox } from 'react-icons/md'
import UserDropdown from '@/components/features/user-dropdown'
import DatepickerComponent from '@/components/features/date-picker'
import TransactionForm from '../forms/transaction-form'
import { ModeToggle } from '../../@globals/dark-mode'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  title: string
  description: string
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="my-5 mb-10 flex w-full items-center justify-between">
      <section className="flex flex-col items-start justify-center">
        <h1 className="text-xl font-bold text-primary md:text-2xl">{title}</h1>
        <span className="text-xs text-muted-foreground">{description}</span>
      </section>

      <section className="flex items-center justify-between gap-4">
        {title === 'Transações' ? <DatepickerComponent /> : ''}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="space-x-2">
              <MdOutlineAddBox />
              <span>Adicionar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar transação</DialogTitle>
            </DialogHeader>
            <TransactionForm />
          </DialogContent>
        </Dialog>
        <UserDropdown />
        <ModeToggle />
      </section>
    </header>
  )
}
