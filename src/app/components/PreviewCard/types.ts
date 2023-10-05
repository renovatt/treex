import { IconType } from 'react-icons'

export type DashCardProps = {
  icon: IconType
  value: number
  description: string
  side: 'left' | 'right'
}
