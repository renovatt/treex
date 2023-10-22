'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types.js'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionTableContent from '../TransactionTableContent'

export default function TransactionTable() {
  const [user, loading] = useAuthState(auth)
  const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

  useEffect(() => {
    if (user) {
      setUserLoaded(user as UserData)
    }
  }, [user])

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
