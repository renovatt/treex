'use client'
import { useGetCrypto } from '@/hooks/useGetCrypto'
import ListItem, { CriptoCoinTypeProps } from './list-item'

export default function CriptoList() {
  const { data, isError, isLoading } = useGetCrypto()
  const sortedData = data?.sort(
    (a, b) => Number(b.quote.USD.price) - Number(a.quote.USD.price),
  )
  return (
    <section className="size-full md:mb-4">
      <ul className="flex h-52 max-h-[30rem] w-full flex-col items-center justify-start gap-2 overflow-scroll overflow-x-hidden lg:h-full">
        {isError && (
          <h1 className="text-xs text-white">Dados não podem ser carregados</h1>
        )}

        {isLoading && (
          <h1 className="text-xs text-muted-foreground">Carregando..</h1>
        )}

        {sortedData?.map((crypto: CriptoCoinTypeProps) => (
          <ListItem
            key={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol.toUpperCase()}
            currentPrice={Number(crypto.quote.USD.price).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
              },
            )}
          />
        ))}
      </ul>
    </section>
  )
}
