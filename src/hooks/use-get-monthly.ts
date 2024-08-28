import { UserData } from '@/lib/types'
import { useEffect, useState } from 'react'
import { MonthyPreviewFormProps } from '@/schemas'
import { listenForMonthly } from '@/lib/observers'

export const useGetMonthly = (user: UserData) => {
  const [monthlyData, setMonthlyData] = useState<MonthyPreviewFormProps[]>([])

  useEffect(() => {
    const unsubscribe = listenForMonthly(user, (newData) => {
      setMonthlyData(newData)
    })

    return () => unsubscribe()
  }, [user])

  return { monthlyData }
}
