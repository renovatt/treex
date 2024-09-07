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

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Despesas fixas</CardTitle>
            <CardDescription>Anote suas despesas futuras</CardDescription>
          </div>
          <div>
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
          </div>
        </CardHeader>
        <CardContent>
          <MonthyList />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Lista de prioridades</CardTitle>
            <CardDescription>Crie sua lista de prioridades</CardDescription>
          </div>
          <div>
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
          </div>
        </CardHeader>
        <CardContent>
          <PriorityList />
        </CardContent>
      </Card>
    </div>
  )
}
