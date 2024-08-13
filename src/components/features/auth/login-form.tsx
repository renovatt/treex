'use client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signInWithCredential } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormProps, LoginSchema } from '@/schemas/auth'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const form = useForm<LoginFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()

  const handleFormSubmit = async (data: LoginFormProps) => {
    const { status, message } = await signInWithCredential(data)
    if (!status) {
      toast.error(message)
      return
    }
    router.push('/dashboard')
    toast.success(message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4"
      >
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
        <Link
          href={'/recovery'}
          className="text-secondary-800 self-end text-xs"
        >
          Esqueceu sua senha?
        </Link>
        <Button type="submit" className="w-full">
          Fazer login
        </Button>
      </form>
    </Form>
  )
}