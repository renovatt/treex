import { getCriptoCoins } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { CriptoCoinTypeProps } from '@/app/components/elements/CriptoItemList/types'

export const useGetCrypto = () => {
  const { data, isLoading, error, isError } = useQuery<CriptoCoinTypeProps[]>({
    queryKey: ['crypto'],
    queryFn: () => getCriptoCoins(),
  })
  return { data, isLoading, error, isError }
}
