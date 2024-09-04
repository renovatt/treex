import { useQuery } from '@tanstack/react-query'
import { CriptoCoinTypeProps } from '../_components/list-item'
import { getCriptoCoins } from '../services/cripto.service'

export const useGetCrypto = () => {
  const { data, isLoading, error, isError } = useQuery<CriptoCoinTypeProps[]>({
    queryKey: ['crypto'],
    queryFn: () => getCriptoCoins(),
  })
  return { data, isLoading, error, isError }
}
