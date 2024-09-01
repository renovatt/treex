'use client'
import { useEffect, useRef } from 'react'
import PriorityListItem from './priority-list-item'
import { useGetPriority } from '@/hooks/use-get-priority'

export default function PriorityList() {
  const { priorityData } = useGetPriority()
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
      {!priorityData.length ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há itens
          </p>
        </div>
      ) : (
        priorityData.map((priority) => (
          <PriorityListItem
            id={priority.id ?? ''}
            key={priority.id}
            title={priority.name}
            level={priority.level}
          />
        ))
      )}
    </ul>
  )
}
