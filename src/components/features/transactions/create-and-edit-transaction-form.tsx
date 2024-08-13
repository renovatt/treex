import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import {
  deleteTransactionDoc,
  savingUserTransaction,
  updatingUserTransaction,
} from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { TransactionFormProps, TransactionSchema } from '@/schemas'
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
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { getTransactionDoc } from '@/lib/gets'
import { LoaderCircle } from 'lucide-react'
import { categories } from '@/static/categories'

export default function CreateAndEditTransactionForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TransactionFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TransactionSchema),
  })

  const [user] = useAuthState(auth)
  const transactionValue = form.watch('transaction')
  const category = form.watch('category')

  const handleFormSubmit = async (data: TransactionFormProps) => {
    setIsLoading(true)
    try {
      if (category === categories[0] && transactionValue) {
        toast.error('Salário não pode ser uma saída')
        return
      }

      if (id) {
        const newData = { ...data }
        newData.id = id

        const { status, message } = await updatingUserTransaction(
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

      const { status, message } = await savingUserTransaction(
        data,
        user as UserData,
      )

      if (!status) {
        toast.error(message)
        return
      }

      toast.success(message)
      form.reset()
    } catch (e) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deleteTransactionDoc(
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
      const handleGetTransactionDoc = async () => {
        const data = await getTransactionDoc(user as UserData, id)
        const defaultValues = {
          name: data?.name,
          value: data?.value,
          category: data?.category,
          transaction: data?.transaction,
        }

        form.reset(defaultValues)
      }
      handleGetTransactionDoc()
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
                <Input placeholder="Freelancer" {...field} />
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

        <FormField
          control={form.control}
          name="category"
          defaultValue={categories[1]}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transaction"
          defaultValue={true}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
              <div className="space-y-0.5">
                <FormLabel>{transactionValue ? 'Saída' : 'Entrada'}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
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
