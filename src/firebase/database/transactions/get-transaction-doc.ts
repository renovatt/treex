import { UserData } from '../@types'
import { collection, doc, getDoc } from 'firebase/firestore'
import { userCollectionRef } from '../user-db-collection-ref'
import { TRANSACTIONS_COLLECTION } from '../../static/collections'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'

export const getTransaction = async (user: UserData, transactionId: string) => {
  const { uid } = user

  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    TRANSACTIONS_COLLECTION,
  )

  const transactionRef = doc(transactionsCollection, transactionId)
  const transactionDoc = await getDoc(transactionRef)

  if (transactionDoc.exists()) {
    const transactionData = transactionDoc.data()
    return transactionData as TransactionFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
