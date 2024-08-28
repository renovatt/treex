import { UserData } from '@/lib/types'
import { useEffect, useState } from 'react'
import { TransactionFormProps } from '@/schemas'
import { listenForTransactions } from '@/lib/observers'

export const useGetTransactions = (user: UserData) => {
  const [transactionData, setTransactionData] = useState<
    TransactionFormProps[]
  >([])

  useEffect(() => {
    const unsubscribe = listenForTransactions(user, (newData) => {
      setTransactionData(newData)
    })

    return () => unsubscribe()
  }, [user])

  return { transactionData }
}
