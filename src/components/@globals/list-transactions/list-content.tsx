'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { useDateStore } from '@/store'
import ListItem from './list-item'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { formattedDate } from '@/utils/format-date'

export default function ListContent({ user }: { user: UserData }) {
  const { date, setDate } = useDateStore()
  const { transactionData } = useGetTransactions(user)
  const tableRef = useRef<HTMLUListElement | null>(null)

  const filteredData = date
    ? transactionData
        ?.filter((transaction) => {
          const brlDate = date.split('T')[0]
          const dateParts = brlDate.split('/')
          const selectedDate = new Date(
            `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
          ).getTime()

          const transactionDate = new Date(transaction.date || '')

          return (
            transactionDate.getFullYear() ===
              new Date(selectedDate).getFullYear() &&
            transactionDate.getMonth() === new Date(selectedDate).getMonth() &&
            transactionDate.getDate() === new Date(selectedDate).getDate()
          )
        })
        .sort((a, b) => {
          return (
            new Date(a.date ?? '').getTime() - new Date(b.date ?? '').getTime()
          )
        })
    : transactionData.sort((a, b) => {
        return (
          new Date(a.date ?? '').getTime() - new Date(b.date ?? '').getTime()
        )
      })

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, -tableRef.current.scrollHeight)
    }
  }, [transactionData])

  useEffect(() => {
    setDate('')
  }, [setDate])

  return (
    <ul
      ref={tableRef}
      className="flex h-96 w-full flex-col-reverse items-start justify-start space-y-2 overflow-scroll overflow-x-hidden"
    >
      {!filteredData?.length ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há transações
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
            title={transaction.name}
            value={formatteCurrency(transaction.value)}
            catelory={transaction.category}
          />
        ))
      )}
    </ul>
  )
}
