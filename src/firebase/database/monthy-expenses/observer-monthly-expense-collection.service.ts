import { UserData } from '../@types'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { MONTHLY_EXPENSES_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { MonthyPreviewFormProps } from '@/features/notes/schemas/expenses-monthly-schema'

export const observerMonthlyExpenseService = (
  user: UserData,
  callback: (expense: MonthyPreviewFormProps[]) => void,
) => {
  const uid = user?.uid

  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    MONTHLY_EXPENSES_COLLECTION,
  )

  const monthlyQuery = query(monthlyExpenseCollection, orderBy('date'))

  return onSnapshot(monthlyQuery, (snapshot) => {
    const monthlyItems: MonthyPreviewFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value, category, date } = doc.data()
      const userMonthlyData = { id: doc.id, name, value, category, date }
      monthlyItems.push(userMonthlyData as MonthyPreviewFormProps)
    })
    callback(monthlyItems)
  })
}
