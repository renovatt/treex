'use client'
import AnimatedValueCount from '@/components/@globals/animated-value-count'
import { Progress } from '@/components/ui/progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import CreateAndEditCreditCardExpensesForm from './credit-card/create-and-edit-credit-card-expenses-form'
import { CreditCardSchemaProps } from '../schemas/credit-card-schema'
import { Edit, LoaderCircle } from 'lucide-react'
import CreateAndEditCreditCardForm from './credit-card/create-and-edit-credit-card-form'
import Decimal from 'decimal.js'
import { IoCardOutline } from 'react-icons/io5'
import { createTransaction } from '@/firebase/database/transactions/create-transaction-doc'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'
import { UserData } from '@/firebase/database/@types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { deleteAllCreditCardExpenses } from '@/firebase/database/credit-cards/expenses/delete-all-credit-card-expenses-doc'

type Props = {
  card: CreditCardSchemaProps
}

export default function CreditCard({ card }: Props) {
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)

  const hasExpenses = (card?.expenses ?? []).length > 0

  const handlePayExpenses = async () => {
    setIsLoading(true)
    try {
      const promises = card?.expenses?.map(async (expense) => {
        const data: TransactionFormProps = {
          id: expense.id,
          name: expense.name,
          value: expense.value,
          category: expense.category,
          transaction: true,
          date: new Date(),
        }

        const createTransactionResult = await createTransaction(
          data,
          user as UserData,
        )

        if (!createTransactionResult.status) {
          throw new Error(createTransactionResult.message)
        }
      })

      if (promises) {
        await Promise.all(promises)
      }

      const deleteAllExpensesResult = await deleteAllCreditCardExpenses(
        user as UserData,
        card.id as string,
      )

      if (!deleteAllExpensesResult.status) {
        throw new Error(deleteAllExpensesResult.message)
      }

      toast.success('Despesas pagas e movidas para transações')
    } catch (error) {
      toast.error('Erro ao pagar despesas')
    } finally {
      setIsLoading(false)
    }
  }

  const totalExpenses =
    card?.expenses?.reduce(
      (acc, expense) => acc.plus(expense.value),
      new Decimal(0),
    ) ?? 0

  const partialValue = new Decimal(card?.limit || 0)
    .minus(totalExpenses)
    .toFixed(2)

  const isCloseDate = new Date().getDate() >= Number(card.closing_date)
  const limitPercentage = (Number(totalExpenses.toFixed(2)) / card.limit) * 100

  return (
    <div key={card.name} className="space-y-2 rounded-lg p-4">
      <div className="flex flex-col items-start justify-between space-y-5 sm:flex-row sm:space-y-0 md:items-center">
        <div className="flex flex-row items-center space-x-2">
          {/* <Image
            src={`/images/${card.image}`}
            alt={card.name}
            className="size-12 rounded-full"
            width={48}
            height={48}
          /> */}
          <div className="flex size-12 items-center justify-center rounded-full border bg-muted p-2">
            <IoCardOutline className="size-7 shrink-0" />
          </div>
          <div>
            <span className="flex items-center gap-2">
              <h3 className="text-lg font-semibold capitalize">{card.name}</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="space-x-2">
                    <Edit className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AlertDialogHeader className="items-start">
                    <DialogTitle>Editar cartão</DialogTitle>
                  </AlertDialogHeader>
                  <CreateAndEditCreditCardForm id={card.id} />
                </DialogContent>
              </Dialog>
            </span>
            <p className="text-sm capitalize text-muted-foreground">
              {card.flag}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Fatura:{' '}
            <AnimatedValueCount
              value={Number(totalExpenses.toFixed(2))}
              className="text-red-500"
            />
          </p>
          <p className="text-sm text-muted-foreground">
            Limite Disponível:{' '}
            <AnimatedValueCount
              value={Number(partialValue)}
              className="text-green-500"
            />
          </p>
          {isCloseDate ? (
            <p className="text-sm text-muted-foreground">
              Vence dia: {isCloseDate ? card.due_date : card.closing_date} de{' '}
              {new Date().toLocaleString('pt-BR', { month: 'long' })}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Fechamento dia: {card.closing_date} de{' '}
              {new Date().toLocaleString('pt-BR', { month: 'long' })}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-end space-y-1">
        <span className="text-sm text-muted-foreground">
          {limitPercentage.toFixed(2)}%
        </span>
        <Progress value={limitPercentage} />
      </div>

      <div className="flex w-full items-center justify-between py-2">
        {isLoading ? (
          <Button disabled variant="destructive" className="w-32">
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-32"
            onClick={handlePayExpenses}
            disabled={!isCloseDate || !hasExpenses}
            variant={`${isCloseDate && hasExpenses ? 'destructive' : 'outline'}`}
          >
            Pagar despesas
          </Button>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="space-x-2">
              <span>Adicionar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AlertDialogHeader className="items-start">
              <DialogTitle>Adicionar despesa</DialogTitle>
            </AlertDialogHeader>
            <CreateAndEditCreditCardExpensesForm cardId={card.id} />
          </DialogContent>
        </Dialog>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Despesas</AccordionTrigger>
          <AccordionContent>
            <div>
              <ul className="mt-2 space-y-2">
                {card?.expenses?.map((expense) => (
                  <Dialog key={expense.name}>
                    <DialogTrigger asChild>
                      <div className="flex cursor-pointer flex-row items-center justify-between rounded-xl p-2 transition-all hover:bg-muted">
                        <div>
                          <p className="text-sm font-semibold capitalize">
                            {expense.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {expense.category}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          <AnimatedValueCount value={expense.value} />
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <AlertDialogHeader className="items-start">
                        <DialogTitle>Editar despesa</DialogTitle>
                      </AlertDialogHeader>
                      <CreateAndEditCreditCardExpensesForm
                        cardId={card.id}
                        id={expense.id}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
