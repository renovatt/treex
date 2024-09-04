import { UserData } from '../@types'
import { PriorityFormProps } from '@/schemas'
import { collection, doc, getDoc } from 'firebase/firestore'
import { PRIORITY_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'

export const getPriority = async (user: UserData, priorityId: string) => {
  const { uid } = user

  const priorityCollection = collection(
    userCollectionRef,
    uid as string,
    PRIORITY_COLLECTION,
  )

  const priorityRef = doc(priorityCollection, priorityId)
  const priorityDoc = await getDoc(priorityRef)

  if (priorityDoc.exists()) {
    const priorityData = priorityDoc.data()
    return priorityData as PriorityFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
