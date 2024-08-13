import {
  CardHeader,
  CardTitle,
  CardContent,
  // CardDescription,
  Card,
} from '@/components/ui/card'
import { ComponentType, SVGProps } from 'react'
import { IconType } from 'react-icons'

type Props = {
  icon: IconType | ComponentType<SVGProps<SVGSVGElement>>
  value: string
  title: string
  description: string
}

export default function WalletCard({
  title,
  // description,
  icon: Icon,
  value,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  )
}
