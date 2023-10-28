import axios from 'axios'
import { NextResponse } from 'next/server'

const BINANCE_URL_API =
  'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=60'

export const runtime = 'edge'
export async function GET() {
  try {
    const response = await axios.get(BINANCE_URL_API)
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.error()
  }
}
