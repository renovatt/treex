import { getDolar } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { USDBRLResponse } from '@/app/components/modules/CriptoAside/types'

export const useGetDolar = () => {
  const { data, isLoading, error, isError } = useQuery<USDBRLResponse>({
    queryKey: ['dolar'],
    queryFn: () => getDolar(),
  })
  return { data, isLoading, error, isError }
}
