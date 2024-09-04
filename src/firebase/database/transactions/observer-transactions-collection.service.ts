import { UserData } from '../@types'
import { TransactionFormProps } from '@/schemas'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'

export const observerTransactionsService = (
  user: UserData,
  callback: (transactions: TransactionFormProps[]) => void,
) => {
  const uid = user?.uid
  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    'transactions',
  )
  const transactionsQuery = query(transactionsCollection, orderBy('date'))

  return onSnapshot(transactionsQuery, (snapshot) => {
    const transactions: TransactionFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value, category, transaction, date } = doc.data()
      const userTransactionData = {
        id: doc.id,
        name,
        date,
        value,
        category,
        transaction,
      }
      transactions.push(userTransactionData as TransactionFormProps)
    })
    callback(transactions)
  })
}
