import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { PriorityFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'

export const updatePriority = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { id, name, level } = data
    const { uid } = user

    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )
    const priorityListRef = doc(priorityListCollection, id)
    const priorityDoc = await getDoc(priorityListRef)

    if (priorityDoc.exists()) {
      const userPriorityItemUpdated = {
        name,
        level,
      }

      await updateDoc(priorityListRef, userPriorityItemUpdated)

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
