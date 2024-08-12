import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import EditTransactionForm from '../../features/transactions/forms/edit-transaction-form'

type Props = {
  id: string
  title: string
  icon: IconType
  value: string
  date: string
  type: 'expense' | 'income'
}

export default function ListItem({
  date,
  icon: Icon,
  id,
  title,
  type,
  value,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex cursor-pointer items-center rounded-xl p-2 px-4 hover:bg-muted"
        >
          <Icon
            className={`size-6 ${
              type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium capitalize leading-none">
              {title}
            </p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <div className="ml-auto font-medium">{value}</div>
        </motion.div>
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
