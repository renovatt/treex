import { z } from 'zod'

export const expensesMonthyPreviewSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'Nome obrigatório')
    .max(24, 'Nome é muito longo'),
  value: z
    .number({ required_error: 'Campo obrigatório' })
    .min(0.01, 'Valor obrigatório'),
  category: z.string({ required_error: 'Campo obrigatório' }),
  date: z.string().optional(),
})

export type MonthyPreviewFormProps = z.infer<typeof expensesMonthyPreviewSchema>
