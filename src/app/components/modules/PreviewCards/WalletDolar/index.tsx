import { UserData } from '@/lib/types'
import CardValue from '@elements/CardValue'
import { useGetDolar } from '@/hooks/useGetDolar'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { handleWalletBalance, shortNumber } from '@/utils'
import { useGetTransactions } from '@/hooks/useGetTransactions'

export default function WalletCardDolar({ user }: { user: UserData }) {
  const { data: dolar } = useGetDolar()
  const { transactionData } = useGetTransactions(user)
  const Allresult = handleWalletBalance(transactionData)

  const handleWalletToDolar = (walletValue: number) => {
    const rate = dolar?.data.USDBRL.bid
    const converted = walletValue / Number(rate)
    return converted
  }

  const dolarResult = handleWalletToDolar(Allresult.total).toFixed(2)
  const shortConvertedNumber = shortNumber(Number(dolarResult))
  return (
    <CardValue
      description="Dolar saldo"
      icon={RiMoneyDollarCircleLine}
      side="left"
      value={`$${shortConvertedNumber}`}
    />
  )
}
