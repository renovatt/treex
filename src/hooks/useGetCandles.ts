import { getCandles } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { CandleTypeProps } from '@/app/components/ChartJS/Candlestick/types'

export const useGetCandles = () => {
  const { data, isLoading, error, isError } = useQuery<CandleTypeProps[]>({
    queryKey: ['candles'],
    queryFn: () => getCandles(),
  })
  return { data, isLoading, error, isError }
}
