import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { TransactionFormProps } from '@/schemas'
import { useAuthState } from 'react-firebase-hooks/auth'
import { observerTransactionsService } from '@/firebase/database/transactions/observer-transactions-collection.service'

export const useGetTransactions = () => {
  const [transactionData, setTransactionData] = useState<
    TransactionFormProps[]
  >([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = observerTransactionsService(user, (newData) => {
        setTransactionData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { transactionData, isLoading }
}
