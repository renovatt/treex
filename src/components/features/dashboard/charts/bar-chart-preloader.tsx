'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import { OverviewBarChart } from './overview-bar-chart'

export default function BarChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>{userLoaded && !loading ? <OverviewBarChart user={userLoaded} /> : ''}</>
  )
}
