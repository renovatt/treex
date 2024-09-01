import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { TransactionFormProps } from '@/schemas'
import { listenForTransactions } from '@/lib/observers'
import { useAuthState } from 'react-firebase-hooks/auth'

export const useGetTransactions = () => {
  const [transactionData, setTransactionData] = useState<
    TransactionFormProps[]
  >([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = listenForTransactions(user, (newData) => {
        setTransactionData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { transactionData, isLoading }
}
