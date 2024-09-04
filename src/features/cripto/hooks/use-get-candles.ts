import { useQuery } from '@tanstack/react-query'
import { getCandles } from '../services/cripto.service'
import { CandleTypeProps } from '@/features/cripto/_components/charts/candlestick-chart'

export const useGetCandles = () => {
  const { data, isLoading, error, isError } = useQuery<CandleTypeProps[]>({
    queryKey: ['candles'],
    queryFn: () => getCandles(),
  })
  return { data, isLoading, error, isError }
}
