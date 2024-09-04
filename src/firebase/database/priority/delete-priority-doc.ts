import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { PRIORITY_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const deletePriority = async (user: UserData, id: string) => {
  try {
    const { uid } = user

    const priorityCollection = collection(
      userCollectionRef,
      uid as string,
      PRIORITY_COLLECTION,
    )

    await deleteDoc(doc(priorityCollection, id))
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
