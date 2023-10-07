import { IconType } from 'react-icons'

export type TransactionItemListProps = {
  title: string
  icon: IconType
  value: number
  date: string
  type: 'expense' | 'income'
}
