import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { CreditCardExpensesSchemaProps } from '@/features/notes/schemas/credit-card-schema'
import { v4 as uuidv4 } from 'uuid'
import { CREDIT_CARDS_COLLECTION } from '@/firebase/static/collections'
import { UserData, ErrorMessageResponse } from '../../@types'
import { userCollectionRef } from '../../user-db-collection-ref'

export const createCreditCardExpense = async (
  data: CreditCardExpensesSchemaProps,
  user: UserData,
) => {
  try {
    const { id, name, account, category, value } = data

    const { uid } = user

    const creditCardsCollection = collection(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
    )

    const creditCardsRef = doc(creditCardsCollection, id)
    const creditCardsDoc = await getDoc(creditCardsRef)

    if (creditCardsDoc.exists()) {
      const creditCardData = creditCardsDoc.data()

      const newCreditCardExpense = {
        id: uuidv4(),
        name,
        value,
        account,
        category,
        date: Date.now(),
      }

      const updatedExpenses = [
        ...(creditCardData.expenses || []),
        newCreditCardExpense,
      ]

      await updateDoc(creditCardsRef, {
        expenses: updatedExpenses,
      })

      return { message: 'Despesa adicionada com sucesso!', status: true }
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
