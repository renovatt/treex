'use client'
import { useRouter } from 'next/navigation'
import { createCredential } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema, RegisterFormProps } from '@/schemas/auth'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

export default function RegisterForm() {
  const form = useForm<RegisterFormProps>({
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4 lg:space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite o seu email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Form>
  )
}
