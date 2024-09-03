import { USDBRLResponse } from '@/features/cripto/@types/types'
import { getDolar } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useGetDolar = () => {
  const { data, isLoading, error, isError } = useQuery<USDBRLResponse>({
    queryKey: ['dolar'],
    queryFn: () => getDolar(),
  })
  return { data, isLoading, error, isError }
}
