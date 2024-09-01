import CreateAndEditTransactionForm from '@/components/features/transactions/_components/create-and-edit-transaction-form'
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { incomeCategories } from '@/static/categories'
import useHideStore from '@/store/use-hide-store'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

type Props = {
  id: string
  title: string
  icon: IconType
  value: string
  date: string
  type: 'expense' | 'income'
  category: string
}

export default function ListItem({
  date,
  icon: Icon,
  id,
  title,
  type,
  value,
  category,
}: Props) {
  const { status } = useHideStore()
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
            <p className="text-xs text-muted-foreground">
              {date}{' '}
              {category && !incomeCategories.includes(category) && (
                <span className="text-[9px]">- {category}</span>
              )}
            </p>
          </div>
          {status.hidden ? (
            <div className="ml-auto flex items-center gap-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="size-[7px] rounded-full bg-primary"
                />
              ))}
            </div>
          ) : (
            <div className="ml-auto font-medium">{value}</div>
          )}
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Editar transação</DialogTitle>
        </DialogHeader>
        <CreateAndEditTransactionForm id={id} />
      </DialogContent>
    </Dialog>
  )
}
