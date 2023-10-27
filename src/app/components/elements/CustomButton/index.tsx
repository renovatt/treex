import { CustomButtonProps } from './types'

export default function CustomButton({
  title,
  type,
  ...rest
}: CustomButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={`${
        type === 'submit'
          ? 'bg-primary-550 dark:bg-secondary-900'
          : 'bg-secondary-800'
      } mt-2 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white outline-none transition-all ease-in-out focus-within:opacity-70`}
    >
      {title}
    </button>
  )
}
