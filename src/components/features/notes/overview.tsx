import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import PreviewMonthyCard from './preview-monthy-card'
import PreviewPriorityCard from './preview-priority-card'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Despesas previstas</CardTitle>
          <CardDescription>Deixe sua anotação</CardDescription>
        </CardHeader>
        <CardContent>
          <PreviewMonthyCard />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Lista de prioridades</CardTitle>
          <CardDescription>Você fez 265 transações neste mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <PreviewPriorityCard />
        </CardContent>
      </Card>
    </div>
  )
}
