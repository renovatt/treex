import { CandleTypeProps } from '../components/ChartJS/Candlestick/types'

export default function createCandle(
  openTime: string | number | Date,
  open: string,
  high: string,
  low: string,
  close: string,
): CandleTypeProps {
  return {
    x: new Date(openTime),
    y: [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close)],
  }
}
