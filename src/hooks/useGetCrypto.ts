import { CriptoCoinTypeProps } from '@/components/features/cripto/list-item'
import { getCriptoCoins } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useGetCrypto = () => {
  const { data, isLoading, error, isError } = useQuery<CriptoCoinTypeProps[]>({
    queryKey: ['crypto'],
    queryFn: () => getCriptoCoins(),
  })
  return { data, isLoading, error, isError }
}
