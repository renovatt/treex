import { USDBRLResponse } from '@/features/cripto/@types/types'
import { useQuery } from '@tanstack/react-query'
import { getDolar } from '../services/cripto.service'

export const useGetDolar = () => {
  const { data, isLoading, error, isError } = useQuery<USDBRLResponse>({
    queryKey: ['dolar'],
    queryFn: () => getDolar(),
  })
  return { data, isLoading, error, isError }
}
