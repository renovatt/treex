'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types.js'
import { useAuthState } from 'react-firebase-hooks/auth'
import ListContentIncome from './list-content-incone'
import { useUser } from '@/hooks/use-user'

export default function ListTransactionsIncome() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="flex w-full">
      {userLoaded && !loading ? (
        <ListContentIncome user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </section>
  )
}
