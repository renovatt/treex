import { auth } from '@/firebase'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { getMonthlyDoc } from '@/lib/gets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MonthyPreviewFormProps, MonthyPreviewSchema } from '@/schemas'
import { deleteMonthlyDoc, updatingUserMonthlyExpense } from '@/lib/db'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type EditFormProps = {
  id: string
}

export default function EditMonthlyForm({ id }: EditFormProps) {
  const form = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleDelete = async () => {
    const { status, message } = await deleteMonthlyDoc(user as UserData, id)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    const newData = { ...data }
    newData.id = id

    const { status, message } = await updatingUserMonthlyExpense(
      newData,
      user as UserData,
    )

    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  useEffect(() => {
    const handleGetMonthlyDoc = async () => {
      const data = await getMonthlyDoc(user as UserData, id)
      const defaultValues = {
        name: data?.name,
        value: data?.value,
      }

      form.reset(defaultValues)
    }
    handleGetMonthlyDoc()
  }, [id, form, user])

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
        <div className="flex w-full flex-col space-y-2">
          <Button type="submit">Salvar</Button>
          <Button variant="outline" type="button" onClick={handleDelete}>
            Excluir
          </Button>
        </div>
      </form>
    </Form>
  )
}
