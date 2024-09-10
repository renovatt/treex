import { z } from 'zod'

export const transactionSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'Nome obrigatório')
    .max(24, 'Nome é muito longo'),
  value: z
    .number({ required_error: 'Campo obrigatório' })
    .min(0.01, 'Valor obrigatório'),
  transaction: z.boolean(),
  category: z.string(),
  date: z.date({ required_error: 'Campo obrigatório' }).optional(),
})

export type TransactionFormProps = z.infer<typeof transactionSchema>
