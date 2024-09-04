import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { MonthyPreviewFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'

export const updateMonthlyExpense = async (
  data: MonthyPreviewFormProps,
  user: UserData,
) => {
  try {
    const { id, name, value } = data
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      'monthlyExpenses',
    )
    const monthlyExpenseRef = doc(monthlyExpenseCollection, id)
    const monthlyExpenseDoc = await getDoc(monthlyExpenseRef)

    if (monthlyExpenseDoc.exists()) {
      const userMonthlyExpenseUpdated = {
        name,
        value,
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
