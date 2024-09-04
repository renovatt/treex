import { UserData } from '../@types'
import { PriorityFormProps } from '@/schemas'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export const observerPriorityService = (
  user: UserData,
  callback: (priority: PriorityFormProps[]) => void,
) => {
  const uid = user?.uid
  const priorityListCollection = collection(
    userCollectionRef,
    uid as string,
    'priorityList',
  )
  const priorityQuery = query(priorityListCollection, orderBy('date'))

  return onSnapshot(priorityQuery, (snapshot) => {
    const priorityItems: PriorityFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, level } = doc.data()
      const userPriorityData = { id: doc.id, name, level }
      priorityItems.push(userPriorityData as PriorityFormProps)
    })
    callback(priorityItems)
  })
}
