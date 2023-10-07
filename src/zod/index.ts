import { z } from 'zod'

export const TransactionSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  value: z
    .string()
    .min(1, 'Valor obrigatório')
    .refine(
      (value) => {
        const numericValue = parseFloat(value)
        return !isNaN(numericValue) && numericValue >= 0
      },
      {
        message: 'O valor deve ser positivo',
        path: ['value'],
      },
    ),
  transaction: z.boolean(),
  category: z.string(),
})

export const PrioritySchema = z.object({
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  level: z.string(),
})

export const MonthyPreviewSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  value: z
    .string()
    .min(1, 'Valor obrigatório')
    .refine(
      (value) => {
        const numericValue = parseFloat(value)
        return !isNaN(numericValue) && numericValue >= 0
      },
      {
        message: 'O valor deve ser positivo',
        path: ['value'],
      },
    ),
})

export type TransactionFormProps = z.infer<typeof TransactionSchema>
export type PriorityFormProps = z.infer<typeof PrioritySchema>
export type MonthyPreviewFormProps = z.infer<typeof MonthyPreviewSchema>
