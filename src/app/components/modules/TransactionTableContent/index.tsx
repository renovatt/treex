'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import TransactionItemList from '@elements/TransactionItemList'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { useDateStore } from '@/store'

export default function TransactionTableContent({ user }: { user: UserData }) {
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
      className="flex h-52 w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden md:h-[19rem]"
    >
      {filteredData?.map((transaction) => (
        <TransactionItemList
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
      ))}
    </ul>
  )
}
