'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { OverviewPolarChart } from '../overview-polar-chart'
import { useUser } from '@/hooks/use-user'

export default function PolarChartPreloader() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <>
      {userLoaded && !loading ? <OverviewPolarChart user={userLoaded} /> : ''}
    </>
  )
}
