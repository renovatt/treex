import axios from 'axios'
import createCandle from '@/app/utils'
import {
  KlineData,
  CandleTypeProps,
} from '@/app/components/ChartJS/Candlestick/types'
import { CriptoCoinTypeResponse } from '@/app/components/Tables/CriptoItemList/types'

export interface ErrorMessageResponse extends Error {
  message: string
}

// export async function getCandles(symbol = 'BTCUSDT', interval = '1m') {
//   const response = await axios.get(
//     `http://localhost:3333/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`,
//   )
//   const candles: CandleTypeProps[] = response.data.map((k: KlineData) => {
//     return createCandle(k[0], k[1], k[2], k[3], k[4])
//   })
//   return candles
// }

export const getCandles = async () => {
  try {
    const response = await axios.get('/api/websocket')

    if (response) {
      const candles: CandleTypeProps[] = response.data.map((k: KlineData) => {
        return createCandle(k[0], k[1], k[2], k[3], k[4])
      })
      return candles
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    const errorWithMessage: ErrorMessageResponse = new Error('Erro interno')
    throw errorWithMessage
  }
}

export const getCriptoCoins = async () => {
  try {
    const response: CriptoCoinTypeResponse = await axios.get('/api/criptocoin')

    if (response) {
      return response.data
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    const errorWithMessage: ErrorMessageResponse = new Error('Erro interno')
    throw errorWithMessage
  }
}
