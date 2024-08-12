'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import BarChart from './bar-chart'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function BarChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return <>{userLoaded && !loading ? <BarChart user={userLoaded} /> : ''}</>
}
