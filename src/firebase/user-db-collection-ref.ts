import { db } from '@/firebase'
import { collection } from 'firebase/firestore'

export const userCollectionRef = collection(db, 'users')
