import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { savingUserMonthlyExpense } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MonthyPreviewFormProps, MonthyPreviewSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function MonthlyForm() {
  const form = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    const { status, message } = await savingUserMonthlyExpense(
      data,
      user as UserData,
    )
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
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Faculdade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" placeholder="R$ 120,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
