import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { PriorityFormProps } from '@/schemas'
import { useAuthState } from 'react-firebase-hooks/auth'
import { observerPriorityService } from '@/firebase/database/priority/observer-priority-collection.service'

export const useGetPriority = () => {
  const [priorityData, setPriorityData] = useState<PriorityFormProps[]>([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = observerPriorityService(user, (newData) => {
        setPriorityData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { priorityData, isLoading }
}
