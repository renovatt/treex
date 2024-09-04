import { UserData } from '../@types'
import { TransactionFormProps } from '@/schemas'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { TRANSACTIONS_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const observerTransactionsService = (
  user: UserData,
  callback: (transactions: TransactionFormProps[]) => void,
) => {
  const uid = user?.uid

  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    TRANSACTIONS_COLLECTION,
  )

  const transactionsQuery = query(transactionsCollection, orderBy('date'))

  return onSnapshot(transactionsQuery, (snapshot) => {
    const transactions: TransactionFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value, category, transaction, date } = doc.data()
      const transactionData = {
        id: doc.id,
        name,
        date,
        value,
        category,
        transaction,
      }
      transactions.push(transactionData as TransactionFormProps)
    })
    callback(transactions)
  })
}
