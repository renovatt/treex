import { z } from 'zod'

export const prioritySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'Nome obrigatório')
    .max(24, 'Nome é muito longo'),
  level: z.enum(['Importante', 'Menos importante', 'Muito importante']),
  date: z.string().optional(),
})

export type PriorityFormProps = z.infer<typeof prioritySchema>
