import { db } from '@/firebase'
import { UserData } from './types'
import { collection, doc, setDoc } from 'firebase/firestore'

export const savingUserDataIntoFirestore = async (user: UserData) => {
  const userCollectionRef = collection(db, 'users')
  const userRef = doc(userCollectionRef, user.uid)
  await setDoc(userRef, user)
}
