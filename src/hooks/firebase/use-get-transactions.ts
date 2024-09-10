import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { observerTransactionsService } from '@/firebase/database/transactions/observer-transactions-collection.service'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'

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
