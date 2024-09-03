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
import { useState } from 'react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenEye, setIsOpenEye] = useState(false)

  const form = useForm<RegisterFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  })

  const router = useRouter()

  const handleFormSubmit = async (data: RegisterFormProps) => {
    setIsLoading(true)
    try {
      const { status, message } = await createCredential(data)
      if (!status) {
        toast.error(message)
        return
      }
      router.push('/login')
      toast.success(message)
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
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
                <div className="relative flex">
                  <Input
                    placeholder="Digite sua senha"
                    type={isOpenEye ? 'text' : 'password'}
                    {...field}
                  />
                  {isOpenEye ? (
                    <Eye
                      onClick={() => setIsOpenEye(!isOpenEye)}
                      className="absolute right-4 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setIsOpenEye(!isOpenEye)}
                      className="absolute right-4 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled className="w-full">
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        )}
      </form>
    </Form>
  )
}
