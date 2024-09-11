import { UserData } from '../@types'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { CREDIT_CARDS_COLLECTION } from '../../static/collections'
import { userCollectionRef } from '../user-db-collection-ref'
import { CreditCardSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const observeCreditCardsService = (
  user: UserData,
  callback: (creditCards: CreditCardSchemaProps[]) => void,
) => {
  const uid = user?.uid

  const creditCardsCollection = collection(
    userCollectionRef,
    uid as string,
    CREDIT_CARDS_COLLECTION,
  )

  const creditCardTransactionsQuery = query(
    creditCardsCollection,
    orderBy('date'),
  )

  return onSnapshot(creditCardTransactionsQuery, (snapshot) => {
    const creditCards: CreditCardSchemaProps[] = []
    snapshot.forEach((doc) => {
      const {
        name,
        limit,
        image,
        partialValue,
        closingDate,
        dueDate,
        flag,
        expenses,
      } = doc.data()

      const creditCardData = {
        id: doc.id,
        name,
        limit,
        image,
        partialValue,
        closing_date: closingDate,
        due_date: dueDate,
        flag,
        expenses,
      }

      creditCards.push(creditCardData as CreditCardSchemaProps)
    })
    callback(creditCards)
  })
}
