'use client'
import Input from '@elements/Input'
import { useRouter } from 'next/navigation'
import AuthButton from '@elements/AuthButton'
import { createCredential } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { RegisterSchema, RegisterFormProps } from '@/schemas/auth'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const methods = useForm<RegisterFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  })

  const router = useRouter()

  const handleFormSubmit = async (data: RegisterFormProps) => {
    const { status, message } = await createCredential(data)
    if (!status) {
      toast.error(message)
      return
    }
    router.push('/login')
    toast.success(message)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4 lg:space-y-2"
      >
        <Input
          noDark
          name="name"
          label="Nome"
          placeholder="Digite o seu nome"
          type="text"
        />
        <Input
          noDark
          name="email"
          label="Email"
          placeholder="Digite o seu email"
          type="email"
        />
        <Input
          noDark
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
