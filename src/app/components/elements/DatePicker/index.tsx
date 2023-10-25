'use client'
import { useDateStore } from '@/store'
import { customTheme } from './style'
import { Datepicker } from 'flowbite-react'

export default function DatepickerComponent() {
  const { setDate } = useDateStore()
  const handleDatePicker = (date: Date) => {
    const formatedDate = date.toISOString().slice(0, 10)
    setDate(formatedDate)
  }

  return (
    <section className="self-end hover:cursor-pointer">
      <Datepicker
        language="pt-BR"
        theme={customTheme}
        labelTodayButton="Hoje"
        labelClearButton="Limpar"
        onClick={() => setDate('')}
        onSelectedDateChanged={(date: Date) => handleDatePicker(date)}
      />
    </section>
  )
}
