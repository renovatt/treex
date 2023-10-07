import { InputProps } from './types'

export default function Input({
  label,
  placeholder,
  type,
  ...rest
}: InputProps) {
  return (
    <div className="my-4 mb-6">
      <label
        htmlFor={label}
        className="mb-2 inline-block text-sm font-medium text-primary-800"
      >
        {label}
      </label>
      <input
        {...rest}
        type={type}
        id={label}
        className="focus:primary-750 dark:focus:primary-750 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none transition-all ease-in-out focus:border-primary-750 dark:border-gray-600 dark:bg-primary-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-750"
        placeholder={placeholder}
        required
      />
    </div>
  )
}
