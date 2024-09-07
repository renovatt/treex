'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import {
  format,
  subDays,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns'
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

const quickRanges = [
  { label: 'Hoje', from: startOfDay(new Date()), to: endOfDay(new Date()) },
  {
    label: 'Ontem',
    from: startOfDay(subDays(new Date(), 1)),
    to: endOfDay(subDays(new Date(), 1)),
  },
  { label: 'Últimos 7 dias', from: subDays(new Date(), 7), to: new Date() },
  { label: 'Últimos 15 dias', from: subDays(new Date(), 15), to: new Date() },
  {
    label: 'Último mês',
    from: startOfMonth(subMonths(new Date(), 1)),
    to: endOfMonth(subMonths(new Date(), 1)),
  },
  {
    label: 'Este mês',
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  },
  {
    label: 'Ano atual',
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  },
  {
    label: 'Ano passado',
    from: new Date(new Date().getFullYear() - 1, 0, 1),
    to: new Date(new Date().getFullYear() - 1, 11, 31),
  },
]

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

  const handleQuickRangeClick = (from: Date, to: Date) => {
    setDate({ from, to })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-12 justify-start overflow-hidden text-left font-normal sm:w-[300px]',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {date?.from ? (
              date.to ? (
                <div className="hidden sm:block">
                  {format(date.from, 'dd MMM, yyyy', { locale: ptBR })} -{' '}
                  {format(date.to, 'dd MMM, yyyy', { locale: ptBR })}
                </div>
              ) : (
                format(date.from, 'dd MMM, yyyy', { locale: ptBR })
              )
            ) : (
              <span className="hidden sm:block">Selecionar data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-2 w-auto p-0" align="start">
          <div className="flex flex-col gap-2 p-4">
            <div className="mb-2 grid grid-cols-2 flex-col flex-wrap gap-2 sm:flex sm:h-32">
              {quickRanges.map((range) => (
                <Button
                  key={range.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickRangeClick(range.from, range.to)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
