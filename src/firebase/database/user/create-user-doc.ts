import { UserData } from '../@types'
import { doc, setDoc } from 'firebase/firestore'
import { userCollectionRef } from '@/firebase/user-db-collection-ref'

export const createUserDataIntoFirestore = async (user: UserData) => {
  const userRef = doc(userCollectionRef, user.uid)
  await setDoc(userRef, user)
}
