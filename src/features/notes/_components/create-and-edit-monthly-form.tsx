import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/firebase/database/@types'
import { getMonthlyExpense } from '@/firebase/database/monthy-expenses/get-monthly-expense-doc'
import { createMonthlyExpense } from '@/firebase/database/monthy-expenses/create-monthly-expense-doc'
import { deleteMonthlyExpense } from '@/firebase/database/monthy-expenses/delete-monthly-expense-doc'
import { updateMonthlyExpense } from '@/firebase/database/monthy-expenses/update-monthly-expense-doc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
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
import { LoaderCircle } from 'lucide-react'
import MoneyInput from '@/components/@globals/ui/input-money'
import { DeleteModalAlert } from '@/components/@globals/delele-modal-alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categoriesExpenses } from '../static/categories-expenses'
import {
  MonthyPreviewFormProps,
  expensesMonthyPreviewSchema,
} from '../schemas/expenses-monthly-schema'
import { ConfirmModalAlert } from '@/components/@globals/confirm-modal-alert'
import { TransactionFormProps } from '@/features/transactions/schemas/transaction-schema'
import { createTransaction } from '@/firebase/database/transactions/create-transaction-doc'

export default function CreateAndEditMonthlyForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState({
    createAndUpdate: false,
    makePayment: false,
  })

  const form = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(expensesMonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    setIsLoading({ makePayment: false, createAndUpdate: true })
    try {
      if (id) {
        const newData = { ...data }
        newData.id = id

        const { status, message } = await updateMonthlyExpense(
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

      const { status, message } = await createMonthlyExpense(
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
        category: categoriesExpenses[0].name,
      })
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading({ makePayment: false, createAndUpdate: false })
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deleteMonthlyExpense(
      user as UserData,
      id as string,
    )
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  const handlePayExpense = async () => {
    setIsLoading({ makePayment: true, createAndUpdate: false })
    try {
      const data = form.getValues()

      const expense: TransactionFormProps = {
        name: data.name,
        value: data.value,
        category: data.category,
        transaction: true,
        date: new Date(),
      }

      const createTransactionResult = await createTransaction(
        expense,
        user as UserData,
      )

      if (!createTransactionResult.status) {
        throw new Error(createTransactionResult.message)
      }

      const { status, message } = await deleteMonthlyExpense(
        user as UserData,
        id as string,
      )
      if (!status) {
        toast.error(message)
        return
      }

      toast.success('Despesa paga e movida para transação')
    } catch (error) {
      toast.error('Erro ao pagar despesa')
    } finally {
      setIsLoading({ makePayment: false, createAndUpdate: false })
    }
  }

  useEffect(() => {
    if (id) {
      const handleGetMonthlyDoc = async () => {
        const data = await getMonthlyExpense(user as UserData, id)
        const defaultValues = {
          name: data?.name,
          value: data?.value,
          category: data?.category,
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

        <FormField
          control={form.control}
          name="category"
          defaultValue={categoriesExpenses[0].name}
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
                  {categoriesExpenses.map(({ name, icon: Icon }, index) => (
                    <SelectItem key={index} value={name}>
                      <div className="flex items-center gap-2">
                        <div className="flex size-[24px] items-center justify-center rounded-full bg-secondary">
                          <Icon className="size-4 shrink-0 text-muted-foreground" />
                        </div>
                        <span>{name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          {isLoading.createAndUpdate ? (
            <Button disabled className="w-full">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              {id ? 'Editar' : 'Salvar'}
            </Button>
          )}
          {id && <DeleteModalAlert onClick={handleDelete} />}
          {id && (
            <ConfirmModalAlert
              text="Pagar despesa"
              subText="Esta ação não pode ser desfeita. Esta ação irá mover a despesa para transações e excluir permanentemente."
              isLoading={isLoading.makePayment}
              onClick={handlePayExpense}
            />
          )}
        </div>
      </form>
    </Form>
  )
}
