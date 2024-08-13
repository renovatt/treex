'use client'
import { useGetDolar } from '@/hooks/useGetDolar'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import WalletCard from '../../@globals/wallet-card'

export default function CriptoCards() {
  const { data: dolar } = useGetDolar()

  return (
    <>
      <WalletCard
        title="Dolar hoje"
        description="Dolar hoje"
        icon={LiaMoneyBillWaveSolid}
        value={Number(dolar?.data.USDBRL.high).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      />
    </>
  )
}
