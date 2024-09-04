import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'

export const deletePriority = async (user: UserData, id: string) => {
  try {
    const { uid } = user
    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )

    await deleteDoc(doc(priorityListCollection, id))
    return { message: 'Deletado com sucesso!', status: true }
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
