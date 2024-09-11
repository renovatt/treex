import { auth } from '@/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { observeCreditCardsService } from '@/firebase/database/credit-cards/observer-credit-card-collection.service'
import { CreditCardSchemaProps } from '@/features/notes/schemas/credit-card-schema'

export const useGetCreditCards = () => {
  const [creditCardsData, setCreditCardData] = useState<
    CreditCardSchemaProps[]
  >([])

  const [user, isLoading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const unsubscribe = observeCreditCardsService(user, (newData) => {
        setCreditCardData(newData)
      })

      return () => unsubscribe()
    }
  }, [user])

  return { creditCardsData, isLoading }
}
