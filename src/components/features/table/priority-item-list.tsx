'use client'
import { motion } from 'framer-motion'
import { GiBoltShield, GiEdgedShield, GiBorderedShield } from 'react-icons/gi'
import EditPriorityForm from '@/components/features/forms/edit-priority-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type PriorityItemListProps = {
  id: string
  title: string
  level: 'Importante' | 'Menos importante' | 'Muito importante'
}

export default function PriorityItemList({
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
          className="my-1 flex w-full items-center justify-between rounded-xl px-6 py-4 transition-all ease-in-out hover:cursor-pointer hover:bg-muted"
        >
          <span className="flex items-center justify-center text-xs capitalize text-muted-foreground md:text-base">
            {title}
          </span>

          {level === 'Importante' ? (
            <>
              <div className="flex items-center justify-center gap-4">
                <span className="hidden text-xs text-muted-foreground md:flex">
                  Importante
                </span>
                <GiBoltShield className="text-secondary-800 h-6 w-6 shadow-sm" />
              </div>
            </>
          ) : level === 'Menos importante' ? (
            <>
              <div className="flex items-center justify-center gap-4">
                <span className="hidden text-xs text-muted-foreground md:flex">
                  Menos importante
                </span>
                <GiEdgedShield className="text-secondary-900 h-6 w-6 shadow-sm" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                <span className="hidden text-xs text-muted-foreground md:flex">
                  Muito importante
                </span>
                <GiBorderedShield className="text-secondary-750 h-6 w-6 shadow-sm" />
              </div>
            </>
          )}
        </motion.li>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar prioridade</DialogTitle>
        </DialogHeader>
        <EditPriorityForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
