import {
  TransactionFormProps,
  MonthyPreviewFormProps,
  PriorityFormProps,
} from '@/schemas'
import { db } from '@/firebase'
import { UserData } from './types'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

const userCollectionRef = collection(db, 'users')

export const listenForTransactions = (
  user: UserData,
  callback: (transactions: TransactionFormProps[]) => void,
) => {
  const uid = user?.uid
  const transactionsCollection = collection(
    userCollectionRef,
    uid as string,
    'transactions',
  )
  const transactionsQuery = query(transactionsCollection, orderBy('date'))

  return onSnapshot(transactionsQuery, (snapshot) => {
    const transactions: TransactionFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value, category, transaction, date } = doc.data()
      const userTransactionData = {
        id: doc.id,
        name,
        date,
        value,
        category,
        transaction,
      }
      transactions.push(userTransactionData as TransactionFormProps)
    })
    callback(transactions)
  })
}

export const listenForMonthly = (
  user: UserData,
  callback: (monthly: MonthyPreviewFormProps[]) => void,
) => {
  const uid = user?.uid
  const monthlyExpenseCollection = collection(
    userCollectionRef,
    uid as string,
    'monthlyExpenses',
  )
  const monthlyQuery = query(monthlyExpenseCollection, orderBy('date'))

  return onSnapshot(monthlyQuery, (snapshot) => {
    const monthlyItems: MonthyPreviewFormProps[] = []
    snapshot.forEach((doc) => {
      const { name, value } = doc.data()
      const userMonthlyData = { id: doc.id, name, value }
      monthlyItems.push(userMonthlyData as MonthyPreviewFormProps)
    })
    callback(monthlyItems)
  })
}

export const listenForPriority = (
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
