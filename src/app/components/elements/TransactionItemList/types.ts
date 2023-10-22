import { IconType } from 'react-icons'

export type TransactionItemListProps = {
  id: string
  title: string
  icon: IconType
  value: string
  date: string
  type: 'expense' | 'income'
}
