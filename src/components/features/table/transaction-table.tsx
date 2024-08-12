'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types.js'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionTableContent from './transaction-table-content'

export default function TransactionTable() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="flex w-full">
      {userLoaded && !loading ? (
        <TransactionTableContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-muted-foreground">Aguardando...</p>
      )}
    </section>
  )
}
