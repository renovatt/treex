import { v4 as uuidv4 } from 'uuid'
import { FirebaseError } from 'firebase/app'
import { collection, addDoc } from 'firebase/firestore'
import { ErrorMessageResponse, UserData } from '../@types'
import { CREDIT_CARDS_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { CreditCardSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const createCreditCard = async (
  data: CreditCardSchemaProps,
  user: UserData,
) => {
  try {
    const {
      name,
      limit,
      closing_date: closingDate,
      due_date: dueDate,
      flag,
      image,
    } = data

    const { uid } = user

    const creditCardsCollection = collection(
      userCollectionRef,
      uid as string,
      CREDIT_CARDS_COLLECTION,
    )

    const newCreditCard = {
      id: uuidv4(),
      name,
      limit,
      image,
      closingDate,
      dueDate,
      flag,
      expenses: [],
      date: Date.now(),
    }

    await addDoc(creditCardsCollection, newCreditCard)

    return { message: 'Cartão criado com sucesso!', status: true }
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
