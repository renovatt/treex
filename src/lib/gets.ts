import { db } from '@/firebase'
import { UserData } from './types'
import { collection, doc, getDoc } from 'firebase/firestore'
import {
  MonthyPreviewFormProps,
  PriorityFormProps,
  TransactionFormProps,
} from '@/schemas'

const userCollectionRef = collection(db, 'users')

export const getTransactionDoc = async (
  user: UserData,
  transactionId: string,
) => {
  const { uid } = user

  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    'transactions',
  )

  const transactionRef = doc(transactionsCollection, transactionId)
  const userTransactionDoc = await getDoc(transactionRef)

  if (userTransactionDoc.exists()) {
    const userTransactionData = userTransactionDoc.data()
    return userTransactionData as TransactionFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}

export const getPriorityDoc = async (user: UserData, priorityId: string) => {
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

export const getMonthlyDoc = async (user: UserData, monthlyId: string) => {
  const { uid } = user

  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    'monthlyExpenses',
  )

  const monthlyExpenseRef = doc(monthlyExpenseCollection, monthlyId)
  const userMonthlyExpenseDoc = await getDoc(monthlyExpenseRef)

  if (userMonthlyExpenseDoc.exists()) {
    const userMonthlyExpenseData = userMonthlyExpenseDoc.data()
    return userMonthlyExpenseData as MonthyPreviewFormProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
