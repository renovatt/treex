import { UserData } from '@/lib/types'
import { useGetDolar } from '@/hooks/useGetDolar'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import WalletCard from '../../@globals/wallet-card'
import { shortNumber } from '@/utils/short-number'
import { handleWalletBalance } from '@/utils/wallet-balance'

export default function CardDolar({ user }: { user: UserData }) {
  const { data: dolar } = useGetDolar()
  const { transactionData } = useGetTransactions(user)
  const allResult = handleWalletBalance(transactionData)

  const handleWalletToDolar = (walletValue: number) => {
    const rate = dolar?.data.USDBRL.bid
    const converted = walletValue / Number(rate)
    return converted
  }

  const dolarResult = handleWalletToDolar(allResult.total).toFixed(2)
  const shortConvertedNumber = shortNumber(Number(dolarResult))
  return (
    <WalletCard
      title="Dolar saldo"
      description="Dolar saldo"
      icon={RiMoneyDollarCircleLine}
      value={`$${shortConvertedNumber}`}
    />
  )
}
