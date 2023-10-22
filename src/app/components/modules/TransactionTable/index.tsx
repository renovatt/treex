'use client'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useRef, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import TransactionItemList from '@elements/TransactionItemList'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'

export default function TransactionTable() {
  const [user] = useAuthState(auth)
  const { transactionData } = useGetTransactions(user as UserData)
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    tableRef.current?.scrollTo(0, -tableRef.current.scrollHeight)
  }, [transactionData])

  return (
    <section className="flex w-full">
      <ul
        ref={tableRef}
        className="flex h-52 w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden md:h-[19rem]"
      >
        {transactionData.map((transaction) => (
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
    </section>
  )
}
