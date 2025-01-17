'use client'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ApexOptions } from 'apexcharts'
import createCandle from '@/utils/create-candle'
import { useGetCandles } from '@/features/cripto/hooks/use-get-candles'

export type ChartState = {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
}

export interface KlineData {
  0: Date // openTime
  1: string // open
  2: string // high
  3: string // low
  4: string // close
}

export type CandleTypeProps = {
  x: Date
  y: number[]
}

export interface LastJsonMessage {
  k: {
    t: string
    o: string
    h: string
    l: string
    c: string
    x: boolean
  }
}

export default function CandlestickChart() {
  const { theme } = useTheme()
  const { data, isError, isLoading } = useGetCandles()
  const [candles, setCandles] = useState<CandleTypeProps[]>([])
  const [chartData, setChartData] = useState<ChartState>({
    options: {
      chart: {
        foreColor: '#787878',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        data: [],
      },
    ],
  })

  const WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1m'
  const { lastJsonMessage, readyState } = useWebSocket<LastJsonMessage>(
    WS_URL,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (readyState === ReadyState.OPEN && lastJsonMessage) {
          const newCandle = createCandle(
            lastJsonMessage.k.t,
            lastJsonMessage.k.o,
            lastJsonMessage.k.h,
            lastJsonMessage.k.l,
            lastJsonMessage.k.c,
          )

          const newData = [...candles]

          if (lastJsonMessage.k.x === false) {
            newData[newData.length - 1] = newCandle
          } else {
            newData.splice(0, 1)
            newData.push(newCandle)
          }
          setCandles(newData)
        }
      },
      onError: (event) => console.error(event),
      shouldReconnect: () => true,
      reconnectInterval: 2000,
    },
  )

  useEffect(() => {
    if (candles && !isError && !isLoading) {
      setChartData({
        options: {
          chart: {
            foreColor: '#787878',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            theme: theme === 'dark' ? 'dark' : 'light',
          },
        },
        series: [
          {
            data: candles,
          },
        ],
      })
    }
    setCandles(data as CandleTypeProps[])
  }, [candles, data, isError, isLoading, theme])

  if (isError)
    return (
      <section className="my-5 flex w-full flex-col items-center justify-center xl:m-0 xl:h-full">
        <h1 className="text-xs text-white">Dados não podem ser carregados</h1>
      </section>
    )

  return (
    <section className="my-5 flex w-full items-center justify-center xl:m-0">
      {isLoading ? (
        <p className="text-xs text-muted-foreground">Carregando..</p>
      ) : (
        <Chart
          type="candlestick"
          className="w-full"
          options={chartData.options}
          series={chartData.series}
        />
      )}
    </section>
  )
}
