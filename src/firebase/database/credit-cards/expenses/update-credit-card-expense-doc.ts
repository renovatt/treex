import { UserData } from '../../@types'
import { FirebaseError } from 'firebase/app'
import { userCollectionRef } from '../../user-db-collection-ref'
import { CREDIT_CARDS_COLLECTION } from '@/firebase/static/collections'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { CreditCardExpensesSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const updateCreditCardExpense = async (
  data: CreditCardExpensesSchemaProps,
  user: UserData,
  cardId: string,
) => {
  try {
    const { id: expenseId, name, account, category, value } = data
    const { uid } = user

    const creditCardsCollection = collection(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
    )

    const creditCardRef = doc(creditCardsCollection, cardId)
    const creditCardDoc = await getDoc(creditCardRef)

    if (creditCardDoc.exists()) {
      const creditCardData = creditCardDoc.data()

      const updatedExpenses = (creditCardData.expenses || []).map(
        (expense: CreditCardExpensesSchemaProps) =>
          expense.id === expenseId
            ? { ...expense, name, account, category, value }
            : expense,
      )

      await updateDoc(creditCardRef, {
        expenses: updatedExpenses,
      })

      return { message: 'Despesa atualizada com sucesso!', status: true }
    } else {
      return { message: 'Cartão de crédito não encontrado', status: false }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        message: error.message || 'Erro interno ao atualizar a despesa',
        status: false,
      }
    }
    return { message: 'Erro desconhecido ao atualizar despesa', status: false }
  }
}
