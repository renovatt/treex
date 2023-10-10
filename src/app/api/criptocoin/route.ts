import axios from 'axios'
import { NextResponse } from 'next/server'

const apiKey = '8c676bc0-16ef-4bcf-9750-3aa86c3e5d06'

export async function GET() {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        params: {
          start: 1,
          limit: 50,
          convert: 'USD',
        },
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
      },
    )
    // console.log(response.data.data)
    return NextResponse.json(response.data.data)
  } catch (error) {
    return NextResponse.error()
  }
}
