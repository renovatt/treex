'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionsCards from './transactions-cards'

export default function GridTransactions() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      {userLoaded && !loading ? (
        <TransactionsCards user={userLoaded} />
      ) : (
        <p>Carregando..</p>
      )}
    </section>
  )
}
