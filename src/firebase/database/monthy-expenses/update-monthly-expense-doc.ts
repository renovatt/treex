import { FirebaseError } from 'firebase/app'
import { ErrorMessageResponse, UserData } from '../@types'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { MONTHLY_EXPENSES_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { MonthyPreviewFormProps } from '@/features/notes/schemas/expenses-monthly-schema'

export const updateMonthlyExpense = async (
  data: MonthyPreviewFormProps,
  user: UserData,
) => {
  try {
    const { id, name, value, category } = data
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      MONTHLY_EXPENSES_COLLECTION,
    )

    const monthlyExpenseRef = doc(monthlyExpenseCollection, id)
    const monthlyExpenseDoc = await getDoc(monthlyExpenseRef)

    if (monthlyExpenseDoc.exists()) {
      const userMonthlyExpenseUpdated = {
        name,
        value,
        category,
      }

      await updateDoc(monthlyExpenseRef, userMonthlyExpenseUpdated)

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
