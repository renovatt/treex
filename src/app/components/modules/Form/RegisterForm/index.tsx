'use client'
import Input from '@elements/Input'
import AuthButton from '@elements/AuthButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { RegisterSchema, RegisterFormProps } from '@/schemas/auth'

export default function RegisterForm() {
  const methods = useForm<RegisterFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  })

  const handleFormSubmit = async (data: RegisterFormProps) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4 lg:space-y-2"
      >
        <Input
          name="name"
          label="Nome"
          placeholder="Digite o seu nome"
          type="text"
        />
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
        <AuthButton title="Cadastrar" type="submit" />
      </form>
    </FormProvider>
  )
}
