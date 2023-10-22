'use client'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { useGetPriority } from '@/hooks/useGetPriority'
import PriorityItemList from '@elements/PriorityItemList'

export default function PriorityTableContent({ user }: { user: UserData }) {
  const { priorityData } = useGetPriority(user)
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, -tableRef.current.scrollHeight)
    }
  }, [priorityData])

  return (
    <ul
      ref={tableRef}
      className="flex max-h-full w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden"
    >
      {priorityData.map((priority) => (
        <PriorityItemList
          id={priority.id ?? ''}
          key={priority.id}
          title={priority.name}
          level={priority.level}
        />
      ))}
    </ul>
  )
}
