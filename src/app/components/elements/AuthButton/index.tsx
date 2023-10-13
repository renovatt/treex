import { AuthButtonProps } from './types'

export default function AuthButton({ title, type, ...rest }: AuthButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className="mt-2 w-full rounded-lg bg-primary-900 px-5 py-2.5 text-center text-sm font-medium text-white outline-none transition-all ease-in-out focus-within:opacity-70"
    >
      {title}
    </button>
  )
}
