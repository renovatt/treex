'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUser } from '@/hooks/use-user'
import { OverviewLineChart } from '../overview-line-chart'

export default function LineChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>{userLoaded && !loading ? <OverviewLineChart user={userLoaded} /> : ''}</>
  )
}
