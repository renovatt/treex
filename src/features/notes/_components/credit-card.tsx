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
import { CreditCardIcon, Edit } from 'lucide-react'
import CreateAndEditCreditCardForm from './credit-card/create-and-edit-credit-card-form'
import Decimal from 'decimal.js'

type Props = {
  card: CreditCardSchemaProps
}

export default function CreditCard({ card }: Props) {
  const totalExpenses =
    card?.expenses?.reduce((acc, expense) => acc + expense.value, 0) ?? 0

  const partialValue = new Decimal(card?.limit || 0)
    .minus(totalExpenses)
    .toFixed(2)

  const isCloseDate = new Date().getDate() >= Number(card.closing_date)
  const limitPercentage = (totalExpenses / card.limit) * 100

  return (
    <div key={card.name} className="space-y-2 rounded-lg p-4">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:space-y-0 md:items-center">
        <div className="flex flex-row items-center space-x-2">
          {/* <Image
            src={`/images/${card.image}`}
            alt={card.name}
            className="size-12 rounded-full"
            width={48}
            height={48}
          /> */}
          <div className="flex size-12 items-center justify-center rounded-full border bg-muted p-2">
            <CreditCardIcon className="size-7 shrink-0" />
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
              value={totalExpenses}
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

      <div className="flex items-center justify-end py-0">
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
