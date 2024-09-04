'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateAndEditTransactionForm from '../../features/transactions/_components/create-and-edit-transaction-form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="size-12 space-x-2 rounded-full bg-primary hover:bg-primary"
        >
          <Plus className="size-6 shrink-0 text-muted" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Adicionar transação</DialogTitle>
        </DialogHeader>
        <CreateAndEditTransactionForm />
      </DialogContent>
    </Dialog>
  )
}
