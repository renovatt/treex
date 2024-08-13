'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { useDateStore } from '@/store'
import ListItem from './list-item'

export default function ListContent({ user }: { user: UserData }) {
  const { date, setDate } = useDateStore()
  const { transactionData } = useGetTransactions(user)
  const tableRef = useRef<HTMLUListElement | null>(null)

  const filteredData = date
    ? transactionData?.filter((transaction) => {
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
    : transactionData

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
      {!filteredData?.length ?(
        <div className="flex w-full h-80 items-center justify-center">
        <p className="text-sm text-muted-foreground font-semibold">Ainda não há transações</p>
      </div>
      ):(
        filteredData?.map((transaction) => (
          <ListItem
            key={transaction.id}
            id={transaction.id ?? ''}
            type={transaction.transaction ? 'expense' : 'income'}
            date={new Date(transaction.date ?? '').toLocaleDateString('pt-br', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
            icon={
              transaction.transaction ? HiArrowTrendingDown : HiArrowTrendingUp
            }
            title={transaction.name}
            value={Number(transaction.value).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          />
        ))
      )}
    </ul>
  )
}
