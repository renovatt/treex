'use client'
import { Fragment, useEffect, useState } from 'react'
import { formattedDate } from '@/utils/format-date'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import ListItem from '@/components/@globals/list-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function ListIncomeTransactions() {
  const [isClient, setIsClient] = useState(false)

  const { transactionData, isLoading } = useGetTransactions()

  const filteredData = transactionData
    ?.filter((transaction) => !transaction.transaction)
    ?.sort((a, b) => {
      return new Date(a.date ?? '').getTime() - new Date(b.date ?? '').getTime()
    })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ScrollArea className="flex h-80 w-full">
      {isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="animate-pulse text-sm font-semibold text-muted-foreground">
            Carregando transações...
          </p>
        </div>
      ) : !filteredData?.length && !isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há entradas
          </p>
        </div>
      ) : (
        filteredData
          ?.slice(-30)
          ?.reverse()
          .map((transaction) => (
            <Fragment key={transaction.id}>
              <ListItem
                id={transaction.id as string}
                type={transaction.transaction ? 'expense' : 'income'}
                date={formattedDate(transaction.date?.toString() ?? '')}
                icon={
                  transaction.transaction
                    ? HiArrowTrendingDown
                    : HiArrowTrendingUp
                }
                category={transaction.category}
                title={transaction.name}
                value={formatteCurrency(transaction.value)}
              />
              <Separator className="my-2" />
            </Fragment>
          ))
      )}
    </ScrollArea>
  )
}
