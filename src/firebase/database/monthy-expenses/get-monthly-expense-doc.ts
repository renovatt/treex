import { UserData } from '../@types'
import { MonthyPreviewFormProps } from '@/schemas'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { collection, doc, getDoc } from 'firebase/firestore'

export const getMonthlyExpense = async (user: UserData, monthlyId: string) => {
  const { uid } = user

  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    'monthlyExpenses',
  )

  const monthlyExpenseRef = doc(monthlyExpenseCollection, monthlyId)
  const userMonthlyExpenseDoc = await getDoc(monthlyExpenseRef)

  if (userMonthlyExpenseDoc.exists()) {
    const userMonthlyExpenseData = userMonthlyExpenseDoc.data()
    return userMonthlyExpenseData as MonthyPreviewFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
