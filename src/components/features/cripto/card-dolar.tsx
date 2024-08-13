import { UserData } from '@/lib/types'
import WalletCard from '../../@globals/wallet-card'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { shortNumber } from '@/utils/short-number'
import { calculateWallet } from '../dashboard/utils/calculate-wallet'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { useGetDolar } from '@/hooks/use-get-dolar'

export default function CardDolar({ user }: { user: UserData }) {
  const { data: dolar } = useGetDolar()
  const { transactionData } = useGetTransactions(user)
  const allResult = calculateWallet(transactionData)

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
