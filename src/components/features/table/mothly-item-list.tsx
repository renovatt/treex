'use client'
import { motion } from 'framer-motion'
import EditMonthlyForm from '@/components/features/forms/edit-monthly-form'
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
  value: string
}

export default function MothlyItemList({ title, value, id }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="my-1 flex w-full items-center justify-between rounded-xl px-6 py-4 transition-all ease-in-out hover:cursor-pointer hover:bg-muted"
        >
          <span className="flex items-center justify-center text-xs capitalize text-muted-foreground md:text-base">
            {title}
          </span>
          <span className="flex h-6 w-20 items-center justify-center text-xs text-muted-foreground md:w-24 md:text-base">
            {value}
          </span>
        </motion.li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar despesa</DialogTitle>
        </DialogHeader>
        <EditMonthlyForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
