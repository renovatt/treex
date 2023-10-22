import { z } from 'zod'

export const TransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  value: z
    .string()
    .min(1, 'Valor obrigatório')
    .refine(
      (value: string) => {
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
  date: z.string().optional(),
})

export const PrioritySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  level: z.enum(['Importante', 'Menos importante', 'Muito importante']),
  date: z.string().optional(),
})

export const MonthyPreviewSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Nome obrigatório').max(24, 'Nome é muito longo'),
  value: z
    .string()
    .min(1, 'Valor obrigatório')
    .refine(
      (value: string) => {
        const numericValue = parseFloat(value)
        return !isNaN(numericValue) && numericValue >= 0
      },
      {
        message: 'O valor deve ser positivo',
        path: ['value'],
      },
    ),
  date: z.string().optional(),
})

export type PriorityFormProps = z.infer<typeof PrioritySchema>
export type TransactionFormProps = z.infer<typeof TransactionSchema>
export type MonthyPreviewFormProps = z.infer<typeof MonthyPreviewSchema>
