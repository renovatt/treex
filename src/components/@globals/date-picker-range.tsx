'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDateStore } from '@/store/use-date-picker-store'

export function DatePickerRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const { setDateRange } = useDateStore()

  React.useEffect(() => {
    if (date?.from && date?.to) {
      setDateRange({ from: date.from, to: date.to })
    }
  }, [date, setDateRange])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd MMM, yyyy', { locale: ptBR })} -{' '}
                  {format(date.to, 'dd MMM, yyyy', { locale: ptBR })}
                </>
              ) : (
                format(date.from, 'dd MMM, yyyy', { locale: ptBR })
              )
            ) : (
              <span>Selecionar data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
