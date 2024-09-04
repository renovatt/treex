import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import { USERS_COLLECTION } from '../static/collections'

export const userCollectionRef = collection(db, USERS_COLLECTION)
