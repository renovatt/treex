'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { MdOutlineAddBox } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import MonthlyTableContent from '../table/monthly-table-content'
import MonthlyForm from '@/components/features/forms/monthly-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function PreviewMonthyCard() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <article className="my-2 flex h-[24.5rem] w-full flex-col items-center justify-start gap-4 rounded-3xl border p-4 xl:w-1/2">
      <section className="flex w-full items-center justify-between">
        <h1 className="self-start text-xs text-muted-foreground xl:w-full xl:text-base">
          Previsão de gastos do mês
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="space-x-2">
              <MdOutlineAddBox />
              <span>Adicionar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar despesa</DialogTitle>
            </DialogHeader>
            <MonthlyForm />
          </DialogContent>
        </Dialog>
      </section>
      {userLoaded && !loading ? (
        <MonthlyTableContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </article>
  )
}
