'use client'
import { useGetDolar } from '@/hooks/useGetDolar'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import CardDolar from '@/components/features/cripto/card-dolar'
import WalletCard from '../../@globals/wallet-card'

export default function CriptoCards() {
  const { data: dolar } = useGetDolar()
  const [user, loading] = useAuthState(auth)
  const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

  useEffect(() => {
    if (user) {
      setUserLoaded(user as UserData)
    }
  }, [user])

  return (
    <aside className="flex size-full flex-col items-center justify-start space-y-5">
      <h2 className="self-start text-xs text-muted-foreground">
        Bitcoin em tempo real
      </h2>

      <section className="flex w-full flex-col items-center justify-center space-y-4">
        <section className="flex w-full items-center justify-start gap-4">
          {userLoaded && !loading ? (
            <CardDolar user={userLoaded} />
          ) : (
            <p>Carregando..</p>
          )}

          <WalletCard
            title="Dolar hoje"
            description="Dolar hoje"
            icon={LiaMoneyBillWaveSolid}
            value={Number(dolar?.data.USDBRL.high).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          />
        </section>
      </section>
    </aside>
  )
}
