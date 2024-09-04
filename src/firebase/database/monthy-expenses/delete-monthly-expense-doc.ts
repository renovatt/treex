import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { MONTHLY_EXPENSES_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const deleteMonthlyExpense = async (user: UserData, id: string) => {
  try {
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      MONTHLY_EXPENSES_COLLECTION,
    )

    await deleteDoc(doc(monthlyExpenseCollection, id))
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
