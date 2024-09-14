'use client'
import PriorityListItem from './priority-list-item'
import { useGetPriority } from '@/hooks/firebase/use-get-priority'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function PriorityList() {
  const { priorityData, isLoading } = useGetPriority()

  return (
    <ScrollArea className="flex h-80 w-full">
      {isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="animate-pulse text-sm font-semibold text-muted-foreground">
            Carregando transações...
          </p>
        </div>
      ) : !priorityData?.length && !isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há entradas
          </p>
        </div>
      ) : (
        priorityData?.map((priority) => (
          <>
            <PriorityListItem
              id={priority.id ?? ''}
              key={priority.id}
              title={priority.name}
              level={priority.level}
            />
            <Separator className="my-2" />
          </>
        ))
      )}
    </ScrollArea>
  )
}
