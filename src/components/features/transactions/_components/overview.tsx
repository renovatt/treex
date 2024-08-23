'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import ListTransactions from '../../../@globals/list-transactions'
import PolarChartPreloader from './charts/preloaders/polar-chart-preloader'
import { auth } from '@/firebase'
import { useUser } from '@/hooks/use-user'
import { UserData } from '@/lib/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { getCurrentMonthTransactionCount } from '../utils/calculate-qtd-transaction'

const TransactionCount = ({ user }: { user: UserData }) => {
  const { transactionData } = useGetTransactions(user)
  const qtd = getCurrentMonthTransactionCount(transactionData)

  return <CardDescription>Você fez {qtd} transações neste mês.</CardDescription>
}

export default function Overview() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 lg:col-span-5">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          {userLoaded && !loading ? (
            <TransactionCount user={userLoaded} />
          ) : (
            <p className="animate-pulse text-xs">...</p>
          )}
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-4 flex flex-col lg:col-span-2">
        <CardHeader className="items-start pb-0">
          <CardTitle>Gastos por categorias</CardTitle>
          <CardDescription>Suas 5 categorias mais gastas</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PolarChartPreloader />
        </CardContent>
      </Card>
    </div>
  )
}
