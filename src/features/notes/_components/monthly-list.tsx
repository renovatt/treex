'use client'
import { useGetMonthly } from '@/hooks/firebase/use-get-monthly'
import MothlyListItem from '@/features/notes/_components/mothly-list-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Fragment, useEffect, useState } from 'react'

export default function MonthyList() {
  const [isClient, setIsClient] = useState(false)
  const { monthlyData, isLoading } = useGetMonthly()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

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
          <Fragment key={monthly.id as string}>
            <MothlyListItem
              id={monthly.id as string}
              title={monthly.name}
              value={Number(monthly.value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
            <Separator className="my-2" />
          </Fragment>
        ))
      )}
    </ScrollArea>
  )
}
