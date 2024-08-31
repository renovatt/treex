import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { MonthyPreviewFormProps } from '@/schemas'
import { listenForMonthly } from '@/lib/observers'
import { useAuthState } from 'react-firebase-hooks/auth'

export const useGetMonthly = () => {
  const [monthlyData, setMonthlyData] = useState<MonthyPreviewFormProps[]>([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = listenForMonthly(user, (newData) => {
        setMonthlyData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { monthlyData, isLoading }
}
