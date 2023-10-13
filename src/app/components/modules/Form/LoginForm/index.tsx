'use client'
import Link from 'next/link'
import Input from '@elements/Input'
import AuthButton from '@elements/AuthButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { LoginFormProps, LoginSchema } from '@/schemas/auth'

export default function LoginForm() {
  const methods = useForm<LoginFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
  })

  const handleFormSubmit = async (data: LoginFormProps) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <Input
          name="email"
          label="Email"
          placeholder="Digite o seu email"
          type="email"
        />
        <Input
          name="password"
          label="Senha"
          placeholder="Digite a sua senha"
          type="password"
        />
        <Link
          href={'/recovery'}
          className="self-end text-xs text-secondary-800"
        >
          Esqueceu sua senha?
        </Link>
        <AuthButton title="Fazer login" type="submit" />
      </form>
    </FormProvider>
  )
}
