import { QuoteList } from '@/entities/brapi-type-stock'
import { getBrapiStockList } from '@/services/brapi.service'
import { useQuery } from '@tanstack/react-query'

export const useGetQuotes = () => {
  const { data, isLoading, error, isError, refetch } = useQuery<QuoteList[]>({
    queryKey: ['quotes'],
    queryFn: () => getBrapiStockList(),
  })
  return { data, isLoading, error, isError, refetch }
}
