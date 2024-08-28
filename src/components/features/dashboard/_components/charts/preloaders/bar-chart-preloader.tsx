'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { OverviewBarChart } from '../overview-bar-chart'
import { useUser } from '@/hooks/use-user'

export default function BarChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>{userLoaded && !loading ? <OverviewBarChart user={userLoaded} /> : ''}</>
  )
}
