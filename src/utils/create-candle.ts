import { CandleTypeProps } from '@/components/features/cripto/_components/charts/candlestick-chart'

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
