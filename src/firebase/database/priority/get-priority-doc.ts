import { UserData } from '../@types'
import { PriorityFormProps } from '@/schemas'
import { collection, doc, getDoc } from 'firebase/firestore'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'

export const getPriority = async (user: UserData, priorityId: string) => {
  const { uid } = user

  const priorityListCollection = collection(
    userCollectionRef,
    uid as string,
    'priorityList',
  )

  const priorityListRef = doc(priorityListCollection, priorityId)
  const userPriorityDoc = await getDoc(priorityListRef)

  if (userPriorityDoc.exists()) {
    const userPriorityData = userPriorityDoc.data()
    return userPriorityData as PriorityFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
