import { db } from '@/firebase'
import { ErrorMessageResponse, UserData } from './types'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  MonthyPreviewFormProps,
  PriorityFormProps,
  TransactionFormProps,
} from '@/schemas'
import { v4 as uuidv4 } from 'uuid'
import { FirebaseError } from 'firebase/app'

const userCollectionRef = collection(db, 'users')

export const savingUserDataIntoFirestore = async (user: UserData) => {
  const userRef = doc(userCollectionRef, user.uid)
  await setDoc(userRef, user)
}

export const savingUserTransaction = async (
  data: TransactionFormProps,
  user: UserData,
) => {
  try {
    const { name, value, category, transaction } = data
    const { uid } = user

    const transactionsCollection = collection(
      userCollectionRef,
      uid as string,
      'transactions',
    )

    const userTransaction = {
      id: uuidv4(),
      name,
      value,
      transaction,
      category,
      date: Date.now(),
    }

    await addDoc(transactionsCollection, userTransaction)

    return { message: 'Transação salva com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const savingUserMonthlyExpense = async (
  data: MonthyPreviewFormProps,
  user: UserData,
) => {
  try {
    const { name, value } = data
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      'monthlyExpenses',
    )

    const userMonthlyExpense = {
      id: uuidv4(),
      name,
      value,
      date: Date.now(),
    }

    await addDoc(monthlyExpenseCollection, userMonthlyExpense)

    return { message: 'Salvo com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const savingUserPriorityList = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { name, level } = data
    const { uid } = user

    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )

    const userPriorityItem = {
      id: uuidv4(),
      name,
      level,
      date: Date.now(),
    }

    await addDoc(priorityListCollection, userPriorityItem)

    return { message: 'Salvo com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const updatingUserTransaction = async (
  data: TransactionFormProps,
  user: UserData,
) => {
  try {
    const { id, name, value, category, transaction } = data
    const { uid } = user

    const transactionsCollection = collection(
      userCollectionRef,
      uid as string,
      'transactions',
    )
    const transactionRef = doc(transactionsCollection, id)
    const transactionDoc = await getDoc(transactionRef)

    if (transactionDoc.exists()) {
      const userTransactionUpdated = {
        name,
        value,
        transaction,
        category,
      }

      await updateDoc(transactionRef, userTransactionUpdated)

      return { message: 'Atualizado com sucesso!', status: true }
    } else {
      return { message: 'Documento não encontrado', status: false }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const updatingUserPriorityList = async (
  data: PriorityFormProps,
  user: UserData,
) => {
  try {
    const { id, name, level } = data
    const { uid } = user

    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )
    const priorityListRef = doc(priorityListCollection, id)
    const priorityDoc = await getDoc(priorityListRef)

    if (priorityDoc.exists()) {
      const userPriorityItemUpdated = {
        name,
        level,
      }

      await updateDoc(priorityListRef, userPriorityItemUpdated)

      return { message: 'Atualizado com sucesso!', status: true }
    } else {
      return { message: 'Documento não encontrado', status: false }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const updatingUserMonthlyExpense = async (
  data: MonthyPreviewFormProps,
  user: UserData,
) => {
  try {
    const { id, name, value } = data
    const { uid } = user

    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      'monthlyExpenses',
    )
    const monthlyExpenseRef = doc(monthlyExpenseCollection, id)
    const monthlyExpenseDoc = await getDoc(monthlyExpenseRef)

    if (monthlyExpenseDoc.exists()) {
      const userMonthlyExpenseUpdated = {
        name,
        value,
      }

      await updateDoc(monthlyExpenseRef, userMonthlyExpenseUpdated)

      return { message: 'Atualizado com sucesso!', status: true }
    } else {
      return { message: 'Documento não encontrado', status: false }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const deleteTransactionDoc = async (user: UserData, id: string) => {
  try {
    const { uid } = user
    const transactionsCollection = collection(
      userCollectionRef,
      uid as string,
      'transactions',
    )

    await deleteDoc(doc(transactionsCollection, id))
    return { message: 'Deletado com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const deletePriorityDoc = async (user: UserData, id: string) => {
  try {
    const { uid } = user
    const priorityListCollection = collection(
      userCollectionRef,
      uid as string,
      'priorityList',
    )

    await deleteDoc(doc(priorityListCollection, id))
    return { message: 'Deletado com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const deleteMonthlyDoc = async (user: UserData, id: string) => {
  try {
    const { uid } = user
    const monthlyExpenseCollection = collection(
      userCollectionRef,
      uid as string,
      'monthlyExpenses',
    )

    await deleteDoc(doc(monthlyExpenseCollection, id))
    return { message: 'Deletado com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}
