'use client'
import { useEffect, useRef } from 'react'
import { formattedDate } from '@/utils/format-date'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import ListItem from '@/components/@globals/list-item'
import { filterTransactionsWithinDateRange } from '../utils/filter-transaction-withini-data-range'
import { useDateStore } from '@/store/use-date-picker-store'

export default function ListDateRangeTransactions() {
  const tableRef = useRef<HTMLUListElement | null>(null)

  const { dateRange } = useDateStore()
  const { transactionData } = useGetTransactions()

  const filteredData = filterTransactionsWithinDateRange(transactionData, {
    from: dateRange.from || new Date(),
    to: dateRange.to || new Date(),
  })

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, -tableRef.current.scrollHeight)
    }
  }, [transactionData])

  return (
    <ul
      ref={tableRef}
      className="flex h-60 w-full flex-col-reverse items-start justify-start space-y-2 overflow-scroll overflow-x-hidden"
    >
      {!filteredData?.length ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há entradas
          </p>
        </div>
      ) : (
        filteredData?.map((transaction) => (
          <ListItem
            key={transaction.id}
            id={transaction.id ?? ''}
            type={transaction.transaction ? 'expense' : 'income'}
            date={formattedDate(transaction.date?.toString() ?? '')}
            icon={
              transaction.transaction ? HiArrowTrendingDown : HiArrowTrendingUp
            }
            catelory={transaction.category}
            title={transaction.name}
            value={formatteCurrency(transaction.value)}
          />
        ))
      )}
    </ul>
  )
}
