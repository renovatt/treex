import { TransactionTableContainerProps } from './types'

export default function TransactionTableContainer({
  children,
}: TransactionTableContainerProps) {
  return (
    <section className="my-8 flex w-full">
      <ul className="flex max-h-48 w-full flex-col items-start justify-start overflow-scroll overflow-x-hidden">
        {children}
      </ul>
    </section>
  )
}
