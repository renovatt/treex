import { UserData } from '@/lib/types'
import { useEffect, useState } from 'react'
import { PriorityFormProps } from '@/schemas'
import { listenForPriority } from '@/lib/observers'

export const useGetPriority = (user: UserData) => {
  const [priorityData, setPriorityData] = useState<PriorityFormProps[]>([])

  useEffect(() => {
    const unsubscribe = listenForPriority(user, (newData) => {
      setPriorityData(newData)
    })

    return () => unsubscribe()
  }, [user])

  return { priorityData }
}
