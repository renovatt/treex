'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { TbMoneybag } from 'react-icons/tb'
import CardValue from '@elements/CardValue'
import { IoWalletOutline } from 'react-icons/io5'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdOutlineMoneyOff, MdOutlineCategory } from 'react-icons/md'
import DashCardValues from '../../PreviewCards/DashCardValues'

export default function GridDash() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  return (
    <section className="grid grid-cols-2 gap-10 gap-x-28 sm:grid-cols-4 sm:gap-x-10 md:grid-cols-4 lg:gap-20 xl:grid-cols-4">
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
