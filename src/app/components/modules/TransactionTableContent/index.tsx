'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import TransactionItemList from '@elements/TransactionItemList'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function TransactionTableContent({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, -tableRef.current.scrollHeight)
    }
  }, [transactionData])

  return (
    <ul
      ref={tableRef}
      className="flex h-52 w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden md:h-[19rem]"
    >
      {transactionData?.map((transaction) => (
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
