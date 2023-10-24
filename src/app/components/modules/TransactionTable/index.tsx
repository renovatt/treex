'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types.js'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionTableContent from '../TransactionTableContent'

export default function TransactionTable() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="flex w-full">
      {userLoaded && !loading ? (
        <TransactionTableContent user={userLoaded} />
      ) : (
        <p className="text-xs font-bold text-primary-800">Aguardando...</p>
      )}
    </section>
  )
}
