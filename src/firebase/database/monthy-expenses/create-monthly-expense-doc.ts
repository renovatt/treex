import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { MonthyPreviewFormProps } from '@/schemas'
import { FirebaseError } from 'firebase/app'
import { collection, addDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { v4 as uuidv4 } from 'uuid'

export const createMonthlyExpense = async (
  data: MonthyPreviewFormProps,
  user: UserData,
) => {
  try {
    const { name, value } = data
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      'monthlyExpenses',
    )

    const userMonthlyExpense = {
      id: uuidv4(),
      name,
      value,
      date: Date.now(),
    }

    await addDoc(monthlyExpenseCollection, userMonthlyExpense)

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
