import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/firebase/database/@types'
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
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  creditCardSchema,
  CreditCardSchemaProps,
} from '../../schemas/credit-card-schema'
import { flags } from '../../static/flags'
import { createCreditCard } from '@/firebase/database/credit-cards/create-credit-card-doc'
import { updateCreditCard } from '@/firebase/database/credit-cards/update-credit-card-doc'
import { deleteCreditCard } from '@/firebase/database/credit-cards/delete-credit-card-doc'
import { getCreditCard } from '@/firebase/database/credit-cards/get-credit-card-doc'
import Decimal from 'decimal.js'

export default function CreateAndEditCreditCardForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreditCardSchemaProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(creditCardSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: CreditCardSchemaProps) => {
    setIsLoading(true)

    const totalExpenses =
      data?.expenses?.reduce(
        (acc, expense) => acc.plus(expense.value || 0),
        new Decimal(0),
      ) || new Decimal(0)

    const partialValue = new Decimal(data?.limit || 0)
      .minus(totalExpenses)
      .toFixed(2)

    const formatedData: CreditCardSchemaProps = {
      ...data,
      partial_value: Number(partialValue),
    }

    try {
      if (id) {
        const updatedData = { ...formatedData }
        updatedData.id = id

        const { status, message } = await updateCreditCard(
          updatedData,
          user as UserData,
        )

        if (!status) {
          toast.error(message)
          return
        }
        toast.success(message)
        return
      }

      const { status, message } = await createCreditCard(
        formatedData,
        user as UserData,
      )

      if (!status) {
        toast.error(message)
        return
      }

      toast.success(message)

      form.reset({
        name: '',
        image: '',
        limit: 0,
        partial_value: 0,
        closing_date: '',
        due_date: '',
        flag: '',
        expenses: [],
      })
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deleteCreditCard(
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
      const handleGetCreditCardDoc = async () => {
        const data = await getCreditCard(user as UserData, id)

        const defaultValues = {
          name: data?.name,
          limit: data?.limit,
          image: data?.image || '',
          partial_value: data?.partial_value,
          closing_date: data?.closing_date,
          due_date: data?.due_date,
          flag: data?.flag,
          expenses: data?.expenses,
        }
        form.reset(defaultValues)
      }
      handleGetCreditCardDoc()
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
                <Input placeholder="Nome do cartão" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MoneyInput
          form={form}
          label="Limite"
          name="limit"
          placeholder="R$ 120,00"
        />

        <FormField
          control={form.control}
          name="closing_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia do fechamento</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 31 }).map((_, index) => (
                    <SelectItem key={index} value={String(index + 1)}>
                      {index + 1}
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
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia do vencimento</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 31 }).map((_, index) => (
                    <SelectItem key={index} value={String(index + 1)}>
                      {index + 1}
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
          name="flag"
          defaultValue={flags[0]}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bandeira</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma bandeira" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {flags.map((flag, index) => (
                    <SelectItem key={index} value={flag}>
                      <div className="flex items-center gap-2">
                        {/* <Avatar className="size-[24px]">
                          <AvatarImage src={image} alt="@avatar" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar> */}
                        <span className="capitalize">{flag}</span>
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
          {isLoading ? (
            <Button disabled className="w-full">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              {id ? 'Editar' : 'Salvar'}
            </Button>
          )}
          {id && <DeleteModalAlert onClick={handleDelete} />}
        </div>
      </form>
    </Form>
  )
}
