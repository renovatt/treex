import { v4 as uuidv4 } from 'uuid'
import { FirebaseError } from 'firebase/app'
import { PriorityFormProps } from '@/schemas'
import { collection, addDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { PRIORITY_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const createPriority = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { name, level } = data
    const { uid } = user

    const priorityCollection = collection(
      userCollectionRef,
      uid as string,
      PRIORITY_COLLECTION,
    )

    const priorityItem = {
      id: uuidv4(),
      name,
      level,
      date: Date.now(),
    }

    await addDoc(priorityCollection, priorityItem)

    return { message: 'Salvo com sucesso!', status: true }
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
