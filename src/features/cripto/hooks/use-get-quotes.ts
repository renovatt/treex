import { useQuery } from '@tanstack/react-query'
import { QuoteList } from '../entities/type-brapi-stock'
import { getBrapiStockList } from '../services/brapi.service'

export const useGetQuotes = () => {
  const { data, isLoading, error, isError, refetch } = useQuery<QuoteList[]>({
    queryKey: ['quotes'],
    queryFn: () => getBrapiStockList(),
  })
  return { data, isLoading, error, isError, refetch }
}
