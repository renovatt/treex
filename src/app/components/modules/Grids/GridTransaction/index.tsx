'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useState, useEffect } from 'react'
import { BiTransfer } from 'react-icons/bi'
import CardValue from '@elements/CardValue'
import { MdOutlineCategory } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionsMonthly from '../../PreviewCards/TransactionsMonthly'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function GridTransaction() {
  const [user, loading] = useAuthState(auth)
  const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

  useEffect(() => {
    if (user) {
      setUserLoaded(user as UserData)
    }
  }, [user])

  return (
    <section className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
      {userLoaded && !loading ? (
        <TransactionsMonthly user={userLoaded} />
      ) : (
        <>
          <CardValue
            description="Total"
            icon={BiTransfer}
            side="left"
            value={'R$ 0'}
          />
          <CardValue
            description="Entradas"
            icon={HiArrowTrendingUp}
            side="right"
            value={'R$ 0'}
          />
          <CardValue
            description="Saídas"
            icon={HiArrowTrendingDown}
            side="left"
            value={'R$ 0'}
          />
          <CardValue
            description="Categoria mais gasta"
            icon={MdOutlineCategory}
            side="left"
            value={'R$ 0'}
          />
        </>
      )}
    </section>
  )
}
