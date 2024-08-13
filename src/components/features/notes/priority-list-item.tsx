'use client'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateAndEditPriorityForm from './forms/create-and-edit-priority-form'
import { Badge } from '@/components/ui/badge'

type PriorityItemListProps = {
  id: string
  title: string
  level: 'Importante' | 'Menos importante' | 'Muito importante'
}

export default function PriorityListItem({
  title,
  level,
  id,
}: PriorityItemListProps) {
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

          {level === 'Importante' ? (
            <Badge>Importante</Badge>
          ) : level === 'Menos importante' ? (
            <Badge>Menos Importante</Badge>
          ) : (
            <Badge>Muito Importante</Badge>
          )}
        </motion.li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Editar prioridade</DialogTitle>
        </DialogHeader>
        <CreateAndEditPriorityForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
