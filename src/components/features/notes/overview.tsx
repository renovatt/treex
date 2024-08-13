'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import MonthyList from './monthy-list'
import PriorityList from './priority-list'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateAndEditMonthlyForm from './forms/create-and-edit-monthly-form'
import { MdOutlineAddBox } from 'react-icons/md'
import CreateAndEditPriorityForm from './forms/create-and-edit-priority-form'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Despesas previstas</CardTitle>
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

      <Card className="col-span-4 lg:col-span-3">
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
