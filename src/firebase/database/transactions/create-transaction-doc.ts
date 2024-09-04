import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { TransactionFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, addDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { v4 as uuidv4 } from 'uuid'

export const createTransaction = async (
  data: TransactionFormProps,
  user: UserData,
) => {
  try {
    const { name, value, category, transaction, date } = data
    const { uid } = user

    const transactionsCollection = collection(
      userCollectionRef,
      uid as string,
      'transactions',
    )

    const userTransaction = {
      id: uuidv4(),
      name,
      value,
      transaction,
      category,
      date: date?.toISOString() ?? Date.now(),
    }

    await addDoc(transactionsCollection, userTransaction)

    return { message: 'Transação salva com sucesso!', status: true }
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