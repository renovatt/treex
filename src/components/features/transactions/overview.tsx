import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card'
import ListTransactions from '../../@globals/list-transactions'
import { OverviewPolarChart } from './charts/overview-polar-chart'
import { TrendingUp } from 'lucide-react'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 lg:col-span-5">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Você fez 265 transações neste mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-4 flex flex-col lg:col-span-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gastos por categorias</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <OverviewPolarChart />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
