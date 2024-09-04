import { UserData } from '../@types'
import { collection, doc, getDoc } from 'firebase/firestore'
import { TransactionFormProps } from '@/schemas'
import { userCollectionRef } from '../../user-db-collection-ref'

export const getTransaction = async (user: UserData, transactionId: string) => {
  const { uid } = user

  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    'transactions',
  )

  const transactionRef = doc(transactionsCollection, transactionId)
  const userTransactionDoc = await getDoc(transactionRef)

  if (userTransactionDoc.exists()) {
    const userTransactionData = userTransactionDoc.data()
    return userTransactionData as TransactionFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
