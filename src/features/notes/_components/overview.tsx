'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateAndEditMonthlyForm from './create-and-edit-monthly-form'
import { MdOutlineAddBox } from 'react-icons/md'
import CreateAndEditPriorityForm from './create-and-edit-priority-form'
import MonthyList from './monthly-list'
import PriorityList from './priority-list'
import CreditCard from './credit-card'
import CreateAndEditCreditCardForm from './credit-card/create-and-edit-credit-card-form'
import { useGetCreditCards } from '@/hooks/firebase/use-get-credit-card'

export default function Overview() {
  const { creditCardsData, isLoading } = useGetCreditCards()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Meus Cartões</CardTitle>
            <CardDescription>Sua lista de cartões de crédito</CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="space-x-2">
                <MdOutlineAddBox />
                <span>Adicionar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle>Adicionar cartão</DialogTitle>
              </DialogHeader>
              <CreateAndEditCreditCardForm />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-5">
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            creditCardsData?.map((card) => (
              <CreditCard key={card.id} card={card} />
            ))
          )}
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Desepas fixas</CardTitle>
            <CardDescription>Sua lista de despesas fixas</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="space-x-2">
                <MdOutlineAddBox />
                <span>Adicionar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle>Adicionar despesa</DialogTitle>
              </DialogHeader>
              <CreateAndEditMonthlyForm />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <MonthyList />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Lista de prioridades</CardTitle>
            <CardDescription>Sua lista de prioridades</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="space-x-2">
                <MdOutlineAddBox />
                <span>Adicionar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle>Adicionar prioridade</DialogTitle>
              </DialogHeader>
              <CreateAndEditPriorityForm />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <PriorityList />
        </CardContent>
      </Card>
    </div>
  )
}
