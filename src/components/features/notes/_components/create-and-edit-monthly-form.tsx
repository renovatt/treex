import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import {
  deleteMonthlyDoc,
  savingUserMonthlyExpense,
  updatingUserMonthlyExpense,
} from '@/lib/db'
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
import { useEffect, useState } from 'react'
import { getMonthlyDoc } from '@/lib/gets'
import { LoaderCircle } from 'lucide-react'
import MoneyInput from '@/components/@globals/ui/input-money'

export default function CreateAndEditMonthlyForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    setIsLoading(true)
    try {
      if (id) {
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
        return
      }

      const { status, message } = await savingUserMonthlyExpense(
        data,
        user as UserData,
      )
      if (!status) {
        toast.error(message)
        return
      }
      toast.success(message)
      form.reset({
        name: '',
        value: 0,
      })
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deleteMonthlyDoc(
      user as UserData,
      id as string,
    )
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  useEffect(() => {
    if (id) {
      const handleGetMonthlyDoc = async () => {
        const data = await getMonthlyDoc(user as UserData, id)
        const defaultValues = {
          name: data?.name,
          value: data?.value,
        }

        form.reset(defaultValues)
      }
      handleGetMonthlyDoc()
    }
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
        <MoneyInput
          form={form}
          label="Valor"
          name="value"
          placeholder="R$ 120,00"
        />
        <div className="space-y-2">
          {isLoading ? (
            <Button disabled className="w-full">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              {id ? 'Editar' : 'Salvar'}
            </Button>
          )}
          {id && (
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={handleDelete}
            >
              Excluir
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
