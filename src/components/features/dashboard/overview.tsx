import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { OverviewBarChart } from './charts/overview-bar-chart'
import ListTransactions from '../../@globals/list-transactions'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Últimos 7 meses</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewBarChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Você fez 265 transações neste mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>
    </div>
  )
}
