'use client'
import { motion } from 'framer-motion'
import EditTransactionForm from '@/components/features/forms/edit-transaction-form'
import { IconType } from 'react-icons'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Props = {
  id: string
  title: string
  icon: IconType
  value: string
  date: string
  type: 'expense' | 'income'
}

export default function TransactionItemList({
  icon: Icon,
  title,
  value,
  date,
  type,
  id,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="my-1 flex w-full items-center justify-between rounded-lg px-3 py-4 transition-all ease-in-out hover:cursor-pointer hover:bg-muted md:px-8"
        >
          <Icon
            className={`size-6 ${
              type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}
          />
          <span className="flex w-auto items-center justify-center text-xs capitalize text-muted-foreground md:w-60 md:text-base">
            {title}
          </span>
          <span className="hidden w-24 items-center justify-center text-xs text-muted-foreground md:flex md:text-base">
            {date}
          </span>
          <span className="flex w-auto items-center justify-center text-xs text-muted-foreground md:w-60 md:text-base">
            {value}
          </span>
        </motion.li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>
        </DialogHeader>
        <EditTransactionForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
