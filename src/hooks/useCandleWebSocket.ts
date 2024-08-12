import { useEffect } from 'react'
import createCandle from '@/utils'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { CandleTypeProps } from '@/components/features/cripto/charts/candlestick-chart'

interface LastJsonMessage {
  k: {
    t: string
    o: string
    h: string
    l: string
    c: string
    x: boolean
  }
}

const WS_URL = 'wss://stream.binance.com:9443/ws/BTCUSDT@kline_1m'

export function useCandleWebSocket(
  candles: CandleTypeProps[],
  setCandles: (candles: CandleTypeProps[]) => void,
) {
  const { lastJsonMessage, readyState } = useWebSocket<LastJsonMessage>(
    WS_URL,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onError: (event) => console.error(event),
      shouldReconnect: () => true,
      reconnectInterval: 2000,
    },
  )

  useEffect(() => {
    if (readyState === ReadyState.OPEN && lastJsonMessage) {
      const newCandle = createCandle(
        lastJsonMessage.k.t,
        lastJsonMessage.k.o,
        lastJsonMessage.k.h,
        lastJsonMessage.k.l,
        lastJsonMessage.k.c,
      )

      console.log(newCandle)
      const newData = [...candles]

      if (lastJsonMessage.k.x === false) {
        newData[newData.length - 1] = newCandle
      } else {
        newData.splice(0, 1)
        newData.push(newCandle)
      }

      setCandles(newData)
    }
  }, [readyState, lastJsonMessage, candles, setCandles])
}
