'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import MothlyListItem from '@/components/features/notes/mothly-list-item'

export default function MonthlyListContent({ user }: { user: UserData }) {
  const { monthlyData } = useGetMonthly(user)
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, -tableRef.current.scrollHeight)
    }
  }, [monthlyData])

  return (
    <ul
      ref={tableRef}
      className="flex max-h-full w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden"
    >
      {monthlyData.map((monthly) => (
        <MothlyListItem
          id={monthly.id ?? ''}
          key={monthly.id}
          title={monthly.name}
          value={Number(monthly.value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        />
      ))}
    </ul>
  )
}
