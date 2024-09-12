import { UserData } from '../@types'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { PRIORITY_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { PriorityFormProps } from '@/features/notes/schemas/priority-schema'

export const observerPriorityService = (
  user: UserData,
  callback: (priority: PriorityFormProps[]) => void,
) => {
  const uid = user?.uid

  const priorityCollection = collection(
    userCollectionRef,
    uid as string,
    PRIORITY_COLLECTION,
  )

  const priorityQuery = query(priorityCollection, orderBy('date'))

  return onSnapshot(priorityQuery, (snapshot) => {
    const priorityItems: PriorityFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, level } = doc.data()
      const priorityData = { id: doc.id, name, level }
      priorityItems.push(priorityData as PriorityFormProps)
    })
    callback(priorityItems)
  })
}
