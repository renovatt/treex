'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types.js'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import ListContent from './list-content'

export default function ListTransactions() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="flex w-full">
      {userLoaded && !loading ? (
        <ListContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </section>
  )
}
