import { TransactionItemListProps } from './types'

export default function TransactionItemList({
  icon: Icon,
  title,
  value,
  date,
}: TransactionItemListProps) {
  return (
    <li className="bg-list-gradient my-1 flex w-full items-center justify-between px-6 py-4">
      <Icon className="h-6 w-6 text-primary-800 shadow-sm" />
      <span className="flex w-24 items-center justify-center text-xs text-primary-800 md:w-28 md:text-base">
        {title}
      </span>
      <span className="hidden items-center justify-center text-xs text-primary-800 md:flex md:w-24 md:text-base">
        {date}
      </span>
      <span className="flex w-24 items-center justify-center text-xs text-primary-800 md:w-24 md:text-base">
        R$ {value}
      </span>
    </li>
  )
}
