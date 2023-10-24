'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useState, useEffect } from 'react'
import DashCardValues from '../../PreviewCards/DashCardValues'
import { useAuthState } from 'react-firebase-hooks/auth'
import CardValue from '@/app/components/elements/CardValue'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import { TbMoneybag } from 'react-icons/tb'

export default function GridDash() {
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
        <DashCardValues user={userLoaded} />
      ) : (
        <>
          <CardValue
            description="Carteira"
            icon={IoWalletOutline}
            side="left"
            value={'R$ 0'}
          />
          <CardValue
            description="Faturamento mensal"
            icon={TbMoneybag}
            side="right"
            value={'R$ 0'}
          />
          <CardValue
            description="Previsão de gastos"
            icon={MdOutlineMoneyOff}
            side="left"
            value={'R$ 0'}
          />
          <CardValue
            description="Categoria mais gasta"
            icon={MdOutlineCategory}
            side="right"
            value={'R$ 0'}
          />
        </>
      )}
    </section>
  )
}
