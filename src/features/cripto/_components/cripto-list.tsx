'use client'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import ListItem, { CriptoCoinTypeProps } from './list-item'
import { formatteCurrency } from '@/utils/format-currency-brl'
import { useGetCrypto } from '@/features/cripto/hooks/use-get-crypto'
import { Fragment } from 'react'

export default function CriptoList() {
  const { data, isError, isLoading } = useGetCrypto()

  const sortedData = data?.sort(
    (a, b) => Number(b.quote.USD.price) - Number(a.quote.USD.price),
  )

  return (
    <ScrollArea className="flex h-80 w-full">
      {isError && (
        <h1 className="text-xs text-white">Dados não podem ser carregados</h1>
      )}

      {isLoading && (
        <h1 className="text-xs text-muted-foreground">Carregando..</h1>
      )}

      {sortedData?.slice(0, 30)?.map((crypto: CriptoCoinTypeProps) => (
        <Fragment key={crypto.id}>
          <ListItem
            name={crypto.name}
            symbol={crypto.symbol.toUpperCase()}
            currentPrice={formatteCurrency(Number(crypto.quote.USD.price))}
          />
          <Separator className="my-2" />
        </Fragment>
      ))}
    </ScrollArea>
  )
}
