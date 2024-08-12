'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { TbReportMoney } from 'react-icons/tb'
import { useAuthState } from 'react-firebase-hooks/auth'
import MontlhyCardValue from './cards/montlhy-card-value'
import CardWallet from '@/components/features/cards/card-wallet'

export default function GridNotes() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="w-full">
      {userLoaded && !loading ? (
        <MontlhyCardValue user={userLoaded} />
      ) : (
        <CardWallet
          description="Total"
          icon={TbReportMoney}
          side="left"
          value={'R$ 0'}
        />
      )}
    </section>
  )
}
