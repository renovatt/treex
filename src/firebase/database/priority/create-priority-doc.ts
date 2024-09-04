import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { FirebaseError } from 'firebase/app'
import { collection, addDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { PriorityFormProps } from '@/schemas'
import { v4 as uuidv4 } from 'uuid'

export const createPriority = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { name, level } = data
    const { uid } = user

    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )

    const userPriorityItem = {
      id: uuidv4(),
      name,
      level,
      date: Date.now(),
    }

    await addDoc(priorityListCollection, userPriorityItem)

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
