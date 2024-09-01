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
  FormDescription,
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
import {
  CalendarIcon,
  LoaderCircle,
  LockKeyhole,
  LockKeyholeOpen,
} from 'lucide-react'
import { categories } from '@/static/categories'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import MoneyInput from '@/components/@globals/ui/input-money'

export default function CreateAndEditTransactionForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveDate, setIsActiveDate] = useState(true)

  const form = useForm<TransactionFormProps>({
    mode: 'onTouched',
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

      if (category !== categories[0] && !transactionValue) {
        toast.error('Categoria não pode ser uma entrada')
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
      form.reset({
        name: '',
        value: 0,
        category: categories[0],
        transaction: false,
        date: new Date(),
      })
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
          date: data?.date ? new Date(data.date) : new Date(),
        }
        form.reset(defaultValues)
      }
      handleGetTransactionDoc()
    }
  }, [id, form, user])

  useEffect(() => {
    if (category === categories[0]) {
      form.setValue('transaction', false)
    } else {
      form.setValue('transaction', true)
    }
  }, [category, form])

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

        <MoneyInput
          form={form}
          label="Valor"
          name="value"
          placeholder="R$ 120,00"
        />

        <FormField
          control={form.control}
          name="category"
          defaultValue={categories[0]}
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
          name="date"
          defaultValue={new Date()}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isActiveDate}
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription
                className="w-28"
                onClick={() => setIsActiveDate(!isActiveDate)}
              >
                <span className="group flex cursor-pointer items-start justify-start gap-2">
                  {isActiveDate ? (
                    <>
                      <LockKeyhole className="size-4" />
                      <span className="group-hover:underline">Editar</span>
                    </>
                  ) : (
                    <>
                      <LockKeyholeOpen className="size-4" />
                      <span className="group-hover:underline">Não editar</span>
                    </>
                  )}
                </span>
              </FormDescription>
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
