'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// import dynamic from 'next/dynamic'
import TradingTickerTape from './trading-view/trading-ticker-tape'
import TradingViewScreener from './trading-view/trading-view-screener'
import QuoteCard from '@/components/@globals/quote-card'
import { QuoteList } from '@/entities/brapi-type-stock'
import { useGetQuotes } from '@/hooks/use-get-quotes'
import { useCallback, useEffect, useState } from 'react'

const options = [
  { value: 'Finance', label: 'Finanças' },
  { value: 'Technology Services', label: 'Serviços de Tecnologia' },
  { value: 'Energy Minerals', label: 'Minerais Energéticos' },
  { value: 'Retail Trade', label: 'Comércio Varejista' },
]

export default function Overview() {
  const [sector, setSector] = useState(options[0].value)
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteList[]>([])

  const { data, isLoading, refetch } = useGetQuotes()

  const filterQuotes = useCallback(() => {
    if (data) {
      return data.filter((quote) => quote.sector === sector).slice(0, 28)
    }
    return []
  }, [data, sector])

  const getSectorLabel = useCallback(() => {
    const selectedOption = options.find((option) => option.value === sector)
    return selectedOption ? selectedOption.label : ''
  }, [sector])

  useEffect(() => {
    const filtered = filterQuotes()
    setFilteredQuotes(filtered)
    refetch()
  }, [filterQuotes, refetch])

  // const CandlestickChart = dynamic(() => import('./charts/candlestick-chart'), {
  //   ssr: false,
  // })

  // const MemoizedCandlestickChart = memo(CandlestickChart)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7">
          <TradingTickerTape />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* <Card className="col-span-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>Bitcoin agora</CardTitle>
            <CardDescription>
              Acompanhe os dados em tempo real (Binance)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandlestickChart />
          </CardContent>
        </Card> */}

        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Criptomoedas</CardTitle>
            <CardDescription>
              Acompanhe as principais criptomoedas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TradingViewScreener />
          </CardContent>
        </Card>

        <Card className="col-span-7">
          <div className="flex flex-col items-start justify-between md:flex-row md:items-end">
            <CardHeader>
              <CardTitle>Bolsa de valores</CardTitle>
              <CardDescription>
                Acompanhe as cotações mais relevantes do mercado de ações (
                {getSectorLabel()}) - {filteredQuotes.length} cotas
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Select onValueChange={setSector} defaultValue={sector}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Escolha um setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Setor</SelectLabel>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          filteredQuotes?.map((item) => (
            <QuoteCard key={item.stock} {...item} />
          ))
        )}
      </div>
    </>
  )
}
