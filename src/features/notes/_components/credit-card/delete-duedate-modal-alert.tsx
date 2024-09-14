import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'

type Props = {
  onClick: () => void
}

export function DeleteDueDateModalAlert({ onClick }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Badge className="cursor-pointer" variant="destructive">
          Fatura vencida
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Fatura vencida!</AlertDialogTitle>
          <AlertDialogDescription>
            Pague sua fatura ou apague as despesas do cartão. Esta ação não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Apagar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
