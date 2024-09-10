import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { MonthyPreviewFormProps } from '@/features/notes/schemas/expenses-monthly-schema'
import { useAuthState } from 'react-firebase-hooks/auth'
import { observerMonthlyExpenseService } from '@/firebase/database/monthy-expenses/observer-monthly-expense-collection.service'

export const useGetMonthly = () => {
  const [monthlyData, setMonthlyData] = useState<MonthyPreviewFormProps[]>([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = observerMonthlyExpenseService(user, (newData) => {
        setMonthlyData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { monthlyData, isLoading }
}
