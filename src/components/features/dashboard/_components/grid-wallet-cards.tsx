'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import DashCards from './dash-cards'
import { useUser } from '@/hooks/use-user'

export default function GridWalletCards() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      {userLoaded && !loading ? (
        <DashCards user={userLoaded} />
      ) : (
        <p>carregando...</p>
      )}
    </section>
  )
}
