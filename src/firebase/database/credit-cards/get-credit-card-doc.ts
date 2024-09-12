import { UserData } from '../@types'
import { collection, doc, getDoc } from 'firebase/firestore'
import { userCollectionRef } from '../user-db-collection-ref'
import { CREDIT_CARDS_COLLECTION } from '../../static/collections'
import { CreditCardSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const getCreditCard = async (user: UserData, creditCardId: string) => {
  const { uid } = user

  const creditCardsCollection = collection(
    userCollectionRef,
    uid as string,
    CREDIT_CARDS_COLLECTION,
  )

  const creditCardsRef = doc(creditCardsCollection, creditCardId)
  const creditCardsDoc = await getDoc(creditCardsRef)

  if (creditCardsDoc.exists()) {
    const creditCardData = creditCardsDoc.data()

    const creditCard = {
      id: creditCardData.id,
      name: creditCardData.name,
      limit: creditCardData.limit,
      image: creditCardData.image,
      closing_date: creditCardData.closingDate,
      due_date: creditCardData.dueDate,
      flag: creditCardData.flag,
      expenses: creditCardData.expenses,
    }

    return creditCard as CreditCardSchemaProps
  } else {
    console.log('Documento não encontrado')
    return null
  }
}
