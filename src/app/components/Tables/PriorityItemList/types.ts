import { IconType } from 'react-icons'

export type PriorityItemListProps = {
  title: string
  icon: IconType
  level: 'Importante' | 'Menos importante' | 'Muito importante'
}
