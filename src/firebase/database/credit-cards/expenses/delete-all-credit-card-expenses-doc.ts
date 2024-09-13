import { FirebaseError } from 'firebase/app'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { userCollectionRef } from '../../user-db-collection-ref'
import { CREDIT_CARDS_COLLECTION } from '@/firebase/static/collections'
import { UserData, ErrorMessageResponse } from '../../@types'

export const deleteAllCreditCardExpenses = async (
  user: UserData,
  creditCardId: string,
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

    await updateDoc(creditCardDocRef, {
      expenses: [],
    })

    return {
      message: 'Todas as despesas foram removidas com sucesso!',
      status: true,
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno ao deletar despesas',
        status: false,
        name: error.code,
      }
      return errorMessage
    }
    return { message: 'Erro desconhecido ao deletar despesas', status: false }
  }
}
