'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import ListTransactions from '../../../@globals/list-transactions'
import BarChartPreloader from './charts/preloaders/bar-chart-preloader'
import ListTransactionsIncome from '@/components/@globals/list-transactions/list-transactions-income'
import DonutChartPreloader from './charts/preloaders/donut-chart-preloader'
import RadialChartPreloader from './charts/preloaders/radial-chart-preloader'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { UserData } from '@/lib/types'
import {
  getCurrentMonthTransactionCount,
  getIncomeTransactionCount,
} from '../../transactions/utils/calculate-qtd-transaction'
import { auth } from '@/firebase'
import { useUser } from '@/hooks/use-user'
import { useAuthState } from 'react-firebase-hooks/auth'

const TransactionCount = ({ user }: { user: UserData }) => {
  const { transactionData } = useGetTransactions(user)
  const qtd = getCurrentMonthTransactionCount(transactionData)

  return <CardDescription>Você fez {qtd} transações neste mês.</CardDescription>
}

const TransactionIncomeCount = ({ user }: { user: UserData }) => {
  const { transactionData } = useGetTransactions(user)
  const qtd = getIncomeTransactionCount(transactionData)

  return <CardDescription>Você fez {qtd} entradas neste mês.</CardDescription>
}

export default function Overview() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Últimos meses</CardTitle>
          <CardDescription>
            Análise do seu faturamento nos últimos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
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

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Balanço</CardTitle>
          <CardDescription>Análise entre entradas e saídas</CardDescription>
        </CardHeader>
        <CardContent>
          <RadialChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Categoria</CardTitle>
          <CardDescription>Análise por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <DonutChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Entradas recentes</CardTitle>
          {userLoaded && !loading ? (
            <TransactionIncomeCount user={userLoaded} />
          ) : (
            <p className="animate-pulse text-xs">...</p>
          )}
        </CardHeader>
        <CardContent>
          <ListTransactionsIncome />
        </CardContent>
      </Card>
    </div>
  )
}
