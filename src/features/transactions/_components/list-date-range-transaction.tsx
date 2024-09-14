'use client'
import { formattedDate } from '@/utils/format-date'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import ListItem from '@/components/@globals/list-item'
import { filterTransactionsWithinDateRange } from '../utils/filter-transaction-withini-data-range'
import { useDateStore } from '@/store/use-date-picker-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function ListDateRangeTransactions() {
  const { dateRange } = useDateStore()
  const { transactionData, isLoading } = useGetTransactions()

  const filteredData = filterTransactionsWithinDateRange(transactionData, {
    from: dateRange.from || new Date(),
    to: dateRange.to || new Date(),
  })

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
            <>
              <ListItem
                key={transaction.id}
                id={transaction.id ?? ''}
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
            </>
          ))
      )}
    </ScrollArea>
  )
}
