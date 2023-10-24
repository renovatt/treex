'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import CardValue from '@elements/CardValue'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { TbReportMoney } from 'react-icons/tb'
import MontlhyCardValue from '../../PreviewCards/MontlhyCardValue'

export default function GridNotes() {
  const [user, loading] = useAuthState(auth)
  const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

  useEffect(() => {
    if (user) {
      setUserLoaded(user as UserData)
    }
  }, [user])
  return (
    <section className="w-full">
      {userLoaded && !loading ? (
        <MontlhyCardValue user={userLoaded} />
      ) : (
        <CardValue
          description="Total"
          icon={TbReportMoney}
          side="left"
          value={'R$ 0'}
        />
      )}
    </section>
  )
}
