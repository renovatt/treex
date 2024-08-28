'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import MontlhyCard from './montlhy-card'
import { useUser } from '@/hooks/use-user'

export default function GridNotes() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <>
      {userLoaded && !loading ? (
        <MontlhyCard user={userLoaded} />
      ) : (
        <p>Carregando..</p>
      )}
    </>
  )
}
