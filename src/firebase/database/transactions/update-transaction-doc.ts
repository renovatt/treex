import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { TransactionFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'

export const updateTransaction = async (
  data: TransactionFormProps,
  user: UserData,
) => {
  try {
    const { id, name, value, category, transaction, date } = data
    const { uid } = user

    const transactionsCollection = collection(
      userCollectionRef,
      uid as string,
      'transactions',
    )
    const transactionRef = doc(transactionsCollection, id)
    const transactionDoc = await getDoc(transactionRef)

    if (transactionDoc.exists()) {
      const userTransactionUpdated = {
        name,
        value,
        transaction,
        category,
        date: date?.toISOString(),
      }

      await updateDoc(transactionRef, userTransactionUpdated)

      return { message: 'Atualizado com sucesso!', status: true }
    } else {
      return { message: 'Documento não encontrado', status: false }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}
