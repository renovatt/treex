'use client'
import { passwordReset } from '@/firebase/database/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RecoverySchema, RecoverySchemaProps } from './schemas/auth'
import toast from 'react-hot-toast'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RecoveryForm() {
  const form = useForm<RecoverySchemaProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RecoverySchema),
  })

  const handleFormSubmit = async (data: RecoverySchemaProps) => {
    const { status, message } = await passwordReset(data)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
    form.reset()
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
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
