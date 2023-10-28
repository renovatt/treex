import axios from 'axios'
import createCandle from '@/utils'
import { USDBRLResponse } from '@/app/components/modules/CriptoAside/types'
import { CriptoCoinTypeResponse } from '@/app/components/elements/CriptoItemList/types'
import { CandleTypeProps, KlineData } from '@elements/ChartJS/Candlestick/types'

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

const BINANCE_URL_API =
  'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=60'

export const getCandles = async () => {
  try {
    const response = await axios.get(BINANCE_URL_API)

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

export const getDolar = async () => {
  try {
    const response: USDBRLResponse = await axios.get(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL',
    )

    if (response) {
      return response
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    const errorWithMessage: ErrorMessageResponse = new Error('Erro interno')
    throw errorWithMessage
  }
}
