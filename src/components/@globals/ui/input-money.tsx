/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useReducer } from 'react'
import { UseFormReturn } from 'react-hook-form'

type TextInputProps = {
  form: UseFormReturn<any>
  name: string
  label: string
  placeholder: string
}

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(props.form.getValues()[props.name])
    : ''

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '')
    return moneyFormatter.format(Number(digits) / 100)
  }, initialValue)

  function handleChange(
    realChangeFn: (value: number) => void,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, '')
    const realValue = Number(digits) / 100
    realChangeFn(realValue)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value
        const _change = field.onChange
        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder={props.placeholder}
                onChange={(ev) => {
                  setValue(ev.target.value)
                  handleChange(_change, ev.target.value)
                }}
                value={value}
                inputMode="decimal"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
