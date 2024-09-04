import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { shortNumber } from '@/utils/short-number'
import { calculateWallet } from '../../dashboard/utils/calculate-wallet'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { useGetDolar } from '@/features/cripto/hooks/use-get-dolar'
import WalletCard from '@/components/@globals/wallet-card'

export default function CardDolar() {
  const { data: dolar } = useGetDolar()
  const { transactionData } = useGetTransactions()
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
