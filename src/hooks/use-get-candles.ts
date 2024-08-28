import { CandleTypeProps } from '@/components/features/cripto/_components/charts/candlestick-chart'
import { getCandles } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useGetCandles = () => {
  const { data, isLoading, error, isError } = useQuery<CandleTypeProps[]>({
    queryKey: ['candles'],
    queryFn: () => getCandles(),
  })
  return { data, isLoading, error, isError }
}
