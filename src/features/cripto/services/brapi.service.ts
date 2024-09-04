import axios from 'axios'
import { BRAPI_API_KEY, BRAPI_BASE_URL } from '@/static/env'
import { RootStock, QuoteList } from '../entities/type-brapi-stock'

export const getBrapiStock = async (
  symbol: string = 'AMER3',
  range: '1d' | '5d' | '1mo' | '3mo' = '1mo',
) => {
  try {
    const response = await axios.get(
      `${BRAPI_BASE_URL}/quote/${symbol}?range=${range}&interval=1d`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BRAPI_API_KEY}`,
        },
      },
    )
    if (response) {
      return response.data as RootStock
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

export const getBrapiStockList = async (): Promise<QuoteList[]> => {
  try {
    const response = await axios.get(`${BRAPI_BASE_URL}/quote/list`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${BRAPI_API_KEY}`,
      },
    })
    if (response) {
      return response.data.stocks
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    console.log('Error:', error)
  }

  return []
}
