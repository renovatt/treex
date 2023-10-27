'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { BiTransfer } from 'react-icons/bi'
import CardValue from '@elements/CardValue'
import { MdOutlineCategory } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import TransactionsMonthly from '../../PreviewCards/TransactionsMonthly'

export default function GridTransaction() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="grid grid-cols-2 gap-10 gap-x-28 sm:grid-cols-4 sm:gap-x-10 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
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
