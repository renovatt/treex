import { UserData } from '../@types'
import { MonthyPreviewFormProps } from '@/schemas'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'

export const observerMonthlyExpenseService = (
  user: UserData,
  callback: (monthly: MonthyPreviewFormProps[]) => void,
) => {
  const uid = user?.uid
  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    'monthlyExpenses',
  )
  const monthlyQuery = query(monthlyExpenseCollection, orderBy('date'))

  return onSnapshot(monthlyQuery, (snapshot) => {
    const monthlyItems: MonthyPreviewFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value } = doc.data()
      const userMonthlyData = { id: doc.id, name, value }
      monthlyItems.push(userMonthlyData as MonthyPreviewFormProps)
    })
    callback(monthlyItems)
  })
}
