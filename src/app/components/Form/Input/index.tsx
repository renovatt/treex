import { InputProps } from './types'
import { ErrorMessage } from '../ErrorMessage'
import { useFormContext, Controller } from 'react-hook-form'

export default function Input({
  label,
  placeholder,
  type,
  name,
  ...rest
}: InputProps) {
  const { control } = useFormContext()
  return (
    <div className="my-4 mb-6">
      <label
        htmlFor={label}
        className="mb-2 inline-block text-sm font-medium text-primary-800"
      >
        {label}
      </label>
      <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({ field }) => (
          <>
            <input
              {...rest}
              {...field}
              id={label}
              type={type}
              placeholder={placeholder}
              className="focus:primary-750 dark:focus:primary-750 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none transition-all ease-in-out focus:border-primary-750 dark:border-gray-600 dark:bg-primary-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-750"
            />
            <ErrorMessage field={name} />
          </>
        )}
      />
    </div>
  )
}
