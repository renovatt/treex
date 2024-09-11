import { z } from 'zod'

export const creditCardExpensesSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'Nome obrigatório')
    .max(24, 'Nome é muito longo'),
  value: z
    .number({ required_error: 'Campo obrigatório' })
    .min(0.01, 'Valor obrigatório'),
  account: z.string({ required_error: 'Campo obrigatório' }),
  category: z.string({ required_error: 'Campo obrigatório' }),
  date: z.string().optional(),
})

export const creditCardSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'Nome obrigatório')
    .max(24, 'Nome é muito longo'),
  image: z.string().optional(),
  limit: z
    .number({ required_error: 'Campo obrigatório' })
    .min(0.01, 'Valor obrigatório'),
  partial_value: z.number().optional(),
  due_date: z.string({ required_error: 'Campo obrigatório' }),
  closing_date: z.string({ required_error: 'Campo obrigatório' }),
  flag: z.string({ required_error: 'Campo obrigatório' }),
  expenses: z.array(creditCardExpensesSchema).optional(),
  date: z.string().optional(),
})

export type CreditCardExpensesSchemaProps = z.infer<
  typeof creditCardExpensesSchema
>
export type CreditCardSchemaProps = z.infer<typeof creditCardSchema>
