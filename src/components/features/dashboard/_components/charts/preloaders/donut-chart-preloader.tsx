'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { OverviewDonutChart } from '../overview-donut-chart'
import { useUser } from '@/hooks/use-user'

export default function DonutChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>
      {userLoaded && !loading ? <OverviewDonutChart user={userLoaded} /> : ''}
    </>
  )
}
