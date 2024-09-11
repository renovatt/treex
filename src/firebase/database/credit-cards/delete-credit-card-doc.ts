import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { CREDIT_CARDS_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const deleteCreditCard = async (user: UserData, id: string) => {
  try {
    const { uid } = user

    const creditCardsCollection = collection(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
    )

    await deleteDoc(doc(creditCardsCollection, id))
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
