'use client'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import MothlyListItem from '@/features/notes/_components/mothly-list-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function MonthyList() {
  const { monthlyData, isLoading } = useGetMonthly()

  return (
    <ScrollArea className="flex h-80 w-full">
      {isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="animate-pulse text-sm font-semibold text-muted-foreground">
            Carregando transações...
          </p>
        </div>
      ) : !monthlyData?.length && !isLoading ? (
        <div className="flex h-80 w-full items-center justify-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Ainda não há entradas
          </p>
        </div>
      ) : (
        monthlyData?.map((monthly) => (
          <>
            <MothlyListItem
              id={monthly.id ?? ''}
              key={monthly.id}
              title={monthly.name}
              value={Number(monthly.value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
            <Separator className="my-2" />
          </>
        ))
      )}
    </ScrollArea>
  )
}
