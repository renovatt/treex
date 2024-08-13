'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { OverviewRadialChart } from '../overview-radial-chart'
import { useUser } from '@/hooks/use-user'

export default function RadialChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>
      {userLoaded && !loading ? <OverviewRadialChart user={userLoaded} /> : ''}
    </>
  )
}
