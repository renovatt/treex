import axios from 'axios'
import { NextResponse } from 'next/server'

const URL_API =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
const KEY_API = process.env.NEXT_PUBLIC_KEY

export async function GET() {
  try {
    const response = await axios.get(
      '',
      // URL_API,
      {
        params: {
          start: 1,
          limit: 50,
          convert: 'USD',
        },
        headers: {
          'X-CMC_PRO_API_KEY': KEY_API,
        },
      },
    )
    // console.log(response.data.data)
    return NextResponse.json(response.data.data)
  } catch (error) {
    return NextResponse.error()
  }
}
