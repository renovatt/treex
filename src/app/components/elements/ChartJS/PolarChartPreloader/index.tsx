'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import PolarChart from '../PolarChart'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function PolarChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return <>{userLoaded && !loading ? <PolarChart user={userLoaded} /> : ''}</>
}
