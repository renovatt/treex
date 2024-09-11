import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { CREDIT_CARDS_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { CreditCardSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const updateCreditCard = async (
  data: CreditCardSchemaProps,
  user: UserData,
) => {
  try {
    const {
      id,
      name,
      limit,
      closing_date: closingDate,
      due_date: dueDate,
      flag,
      image,
      partial_value: partialValue,
    } = data
    const { uid } = user

    const creditCardsCollection = collection(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
    )

    const creditCardsRef = doc(creditCardsCollection, id)
    const creditCardsDoc = await getDoc(creditCardsRef)

    if (creditCardsDoc.exists()) {
      const creditCardUpdated = {
        name,
        limit,
        image,
        partialValue,
        closingDate,
        dueDate,
        flag,
      }

      console.log(creditCardUpdated)

      await updateDoc(creditCardsRef, creditCardUpdated)

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
