import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' }).email('Insira um e-mail válido.'),
  password: z.string({ required_error: 'Campo obrigatório' }).min(8, 'Precisa de pelo menos 8 caracteres'),
})

export const RegisterSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Nome obrigatório'),
  email: z.string({ required_error: 'Campo obrigatório' }).email('Insira um e-mail válido.'),
  password: z.string({ required_error: 'Campo obrigatório' }).min(8, 'Precisa de pelo menos 8 caracteres'),
})

export const RecoverySchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' }).email('Insira um e-mail válido.'),
})

export type LoginFormProps = z.infer<typeof LoginSchema>
export type RegisterFormProps = z.infer<typeof RegisterSchema>
export type RecoverySchemaProps = z.infer<typeof RecoverySchema>
