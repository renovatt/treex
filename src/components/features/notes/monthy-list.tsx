'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import MonthlyListContent from './monthly-list-content'

export default function MonthyList() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="flex h-96 w-full flex-col items-center justify-start gap-4">
      {userLoaded && !loading ? (
        <MonthlyListContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </section>
  )
}
