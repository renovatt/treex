import { TransactionTableContainerProps } from './types'

export default function TransactionTableContainer({
  children,
}: TransactionTableContainerProps) {
  return (
    <section className="flex w-full">
      <ul className="flex h-52 w-full flex-col items-start justify-start overflow-scroll overflow-x-hidden md:h-[19rem]">
        {children}
      </ul>
    </section>
  )
}
