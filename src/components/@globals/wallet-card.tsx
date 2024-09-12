import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card'
import useHideStore from '@/store/use-hide-store'
import { ComponentType, SVGProps } from 'react'
import { IconType } from 'react-icons'
import AnimatedValueCount from './animated-value-count'
import { cn } from '@/lib/utils'

type Props = {
  icon: IconType | ComponentType<SVGProps<SVGSVGElement>>
  value: string | number
  title: string
  description: string
  className?: string
}

export default function WalletCard({
  title,
  description,
  icon: Icon,
  value,
  className,
}: Props) {
  const { status } = useHideStore()
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {status.hidden ? (
          <div className="my-3 flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="size-[7px] rounded-full bg-primary" />
            ))}
          </div>
        ) : (
          <div className="text-2xl font-bold">
            <AnimatedValueCount value={Number(value)} />
          </div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
