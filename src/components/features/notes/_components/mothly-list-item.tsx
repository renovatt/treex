'use client'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateAndEditMonthlyForm from './create-and-edit-monthly-form'

type Props = {
  id: string
  title: string
  value: string
}

export default function MothlyListItem({ title, value, id }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="my-1 flex w-full items-center justify-between rounded-xl px-4 py-2 transition-all ease-in-out hover:cursor-pointer hover:bg-muted"
        >
          <span className="flex items-center justify-center text-xs capitalize text-muted-foreground md:text-base">
            {title}
          </span>
          <span className="flex h-6 items-center justify-end text-xs text-muted-foreground md:text-base">
            {value}
          </span>
        </motion.li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Editar despesa</DialogTitle>
        </DialogHeader>
        <CreateAndEditMonthlyForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
