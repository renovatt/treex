import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { PriorityFormProps } from '@/schemas'
import { listenForPriority } from '@/firebase/database/observers'
import { useAuthState } from 'react-firebase-hooks/auth'

export const useGetPriority = () => {
  const [priorityData, setPriorityData] = useState<PriorityFormProps[]>([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = listenForPriority(user, (newData) => {
        setPriorityData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { priorityData, isLoading }
}
