import { PriorityFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { PRIORITY_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const updatePriority = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { id, name, level } = data
    const { uid } = user

    const priorityCollection = collection(
      userCollectionRef,
      uid as string,
      PRIORITY_COLLECTION,
    )

    const prioritytRef = doc(priorityCollection, id)
    const priorityDoc = await getDoc(prioritytRef)

    if (priorityDoc.exists()) {
      const priorityItemUpdated = {
        name,
        level,
      }

      await updateDoc(prioritytRef, priorityItemUpdated)

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
