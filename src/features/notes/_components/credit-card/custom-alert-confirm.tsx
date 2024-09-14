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
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

type Props = {
  onClick: () => void
  isLoading?: boolean
  isCloseDate: boolean
  hasExpenses: boolean
}

export function CustomConfirmModalAlert({
  onClick,
  isLoading,
  hasExpenses,
  isCloseDate,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Button disabled variant="destructive" className="w-32">
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button
            type="button"
            className="w-32"
            disabled={!isCloseDate || !hasExpenses}
            variant={`${isCloseDate && hasExpenses ? 'destructive' : 'outline'}`}
          >
            Pagar
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Esta ação irá mover as despesas
            para transações e excluir permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {isLoading ? (
            <Button disabled variant="destructive" className="w-32">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <AlertDialogAction onClick={onClick}>Sim</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
