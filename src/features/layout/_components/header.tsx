'use client'
import { MdOutlineAddBox } from 'react-icons/md'
import CreateAndEditTransactionForm from '../../transactions/_components/create-and-edit-transaction-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import useHideStore from '@/store/use-hide-store'
import { SettingsSheet } from '@/components/@globals/settings-sheet'
import { DatePickerRange } from '@/components/@globals/date-picker-range'

type HeaderProps = {
  title: string
  description: string
}

export default function Header({ title, description }: HeaderProps) {
  const { status, setIsHidden } = useHideStore()

  return (
    <header className="my-3 mb-5 flex w-full items-center justify-between">
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

      <section className="flex items-center justify-between gap-2">
        {title === 'Transações' && <DatePickerRange />}
        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="space-x-2 md:size-auto md:rounded-md"
              >
                <MdOutlineAddBox className="size-6 shrink-0" />
                <span className="hidden md:block">Adicionar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle>Adicionar transação</DialogTitle>
              </DialogHeader>
              <CreateAndEditTransactionForm />
            </DialogContent>
          </Dialog>
        </div>

        <SettingsSheet />
      </section>
    </header>
  )
}
