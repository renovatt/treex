'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { MdOutlineAddBox } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import PriorityListContent from './priority-list-content'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreateAndEditPriorityForm from './forms/create-and-edit-priority-form'

export default function PreviewPriorityCard() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <article className="my-2 flex h-[24.5rem] w-full flex-col items-center justify-start gap-4 rounded-3xl p-4">
      <section className="flex w-full items-center justify-between">
        <h1 className="self-start text-xs text-muted-foreground xl:w-full xl:text-base">
          Lista de prioridades
        </h1>
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
      </section>

      {userLoaded && !loading ? (
        <PriorityListContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </article>
  )
}
