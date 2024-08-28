import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card'
import { QuoteList } from '@/entities/brapi-type-stock'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { Triangle } from 'lucide-react'
import Image from 'next/image'

export default function QuoteCard({
  change,
  close,
  logo,
  market_cap: marketCap,
  name,
  stock,
}: QuoteList) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-xl font-bold">{stock}</CardTitle>
          <Image
            src={logo}
            alt="logo"
            width={500}
            height={500}
            priority
            className="size-10 rounded"
          />
        </div>
      </CardHeader>

      <CardContent>
        <section className="flex items-end justify-between">
          <div className="flex flex-col items-start">
            <CardTitle className="text-sm font-semibold">{name}</CardTitle>
            <span className="text-sm font-semibold">
              {formatteCurrency(close)}
            </span>
          </div>

          <div>
            {change < 0 ? (
              <span className="flex items-center gap-2 pb-0.5 text-xs font-semibold">
                <Triangle className="size-3 rotate-180 text-xs text-red-500" />
                {change?.toFixed(2)}%
              </span>
            ) : (
              <span className="flex items-center gap-2 pb-0.5 text-xs font-semibold">
                <Triangle className="size-3 text-xs text-green-500" />
                {change?.toFixed(2)}%
              </span>
            )}
          </div>
        </section>

        <section className="my-2">
          <p className="text-xs text-muted-foreground">
            {formatteCurrency(marketCap)}
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
