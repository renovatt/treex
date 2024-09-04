import { UserData } from '../@types'
import { MonthyPreviewFormProps } from '@/schemas'
import { collection, doc, getDoc } from 'firebase/firestore'
import { MONTHLY_EXPENSES_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const getMonthlyExpense = async (user: UserData, monthlyId: string) => {
  const { uid } = user

  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    MONTHLY_EXPENSES_COLLECTION,
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
