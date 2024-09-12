import { FirebaseError } from 'firebase/app'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { CreditCardExpensesSchemaProps } from '@/features/notes/schemas/credit-card-schema'
import { userCollectionRef } from '../../user-db-collection-ref'
import { CREDIT_CARDS_COLLECTION } from '@/firebase/static/collections'
import { UserData, ErrorMessageResponse } from '../../@types'

export const deleteCreditCardExpense = async (
  user: UserData,
  creditCardId: string,
  expenseId: string,
) => {
  try {
    const { uid } = user

    const creditCardDocRef = doc(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
      creditCardId,
    )

    const creditCardSnapshot = await getDoc(creditCardDocRef)

    if (!creditCardSnapshot.exists()) {
      return { message: 'Cartão de crédito não encontrado!', status: false }
    }

    const creditCardData = creditCardSnapshot.data()

    const updatedExpenses = creditCardData.expenses.filter(
      (expense: CreditCardExpensesSchemaProps) => expense.id !== expenseId,
    )

    await updateDoc(creditCardDocRef, {
      expenses: updatedExpenses,
    })

    return { message: 'Despesa deletada com sucesso!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno ao deletar despesa',
        status: false,
        name: error.code,
      }
      return errorMessage
    }
    return { message: 'Erro desconhecido ao deletar despesa', status: false }
  }
}
