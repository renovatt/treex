import { Switch } from '@headlessui/react'
import { ErrorMessage } from '../ErrorMessage'
import { useFormContext, Controller, useWatch } from 'react-hook-form'

export default function SwitchInput() {
  const { control } = useFormContext()
  const transactionValue = useWatch({ control, name: 'transaction' })
  return (
    <section className="my-4 flex items-center justify-between">
      <span className="text-primary-800 dark:text-white">
        {transactionValue ? 'Saída' : 'Entrada'}
      </span>
      <Controller
        name="transaction"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onChange={(value) => field.onChange(value)}
            className={`${transactionValue ? 'bg-red-500' : 'bg-emerald-400'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${
                transactionValue ? 'translate-x-9' : 'translate-x-0'
              }
          pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
            <ErrorMessage field={field.value} />
          </Switch>
        )}
      />
    </section>
  )
}
