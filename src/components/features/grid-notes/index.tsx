'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import MontlhyCard from './montlhy-card'

export default function GridNotes() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="min-w-96">
      {userLoaded && !loading ? (
        <MontlhyCard user={userLoaded} />
      ) : (
        <p>Carregando..</p>
      )}
    </section>
  )
}
