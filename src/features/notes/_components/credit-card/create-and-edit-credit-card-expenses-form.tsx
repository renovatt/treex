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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { categoriesExpenses } from '../../static/categories-expenses'
import {
  CreditCardExpensesSchemaProps,
  creditCardExpensesSchema,
} from '../../schemas/credit-card-schema'
import { useGetCreditCards } from '@/hooks/firebase/use-get-credit-card'
import { getCreditCard } from '@/firebase/database/credit-cards/get-credit-card-doc'
import { createCreditCardExpense } from '@/firebase/database/credit-cards/expenses/create-expense-credit-card-doc'
import { updateCreditCardExpense } from '@/firebase/database/credit-cards/expenses/update-credit-card-expense-doc'
import { deleteCreditCardExpense } from '@/firebase/database/credit-cards/expenses/delete-credit-card-expense-doc'

export default function CreateAndEditCreditCardExpensesForm({
  id,
  cardId,
}: {
  id?: string
  cardId?: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreditCardExpensesSchemaProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(creditCardExpensesSchema),
  })

  const account = form.watch('account')

  const [user] = useAuthState(auth)
  const { creditCardsData } = useGetCreditCards()

  const foundCard = creditCardsData?.find((card) => card.id === cardId)

  const handleFormSubmit = async (data: CreditCardExpensesSchemaProps) => {
    setIsLoading(true)
    try {
      if (id) {
        const newData = { ...data }
        newData.id = id

        const { status, message } = await updateCreditCardExpense(
          newData,
          user as UserData,
          cardId as string,
        )

        if (!status) {
          toast.error(message)
          return
        }

        toast.success(message)
        return
      }

      const newData = { ...data }
      newData.id = cardId

      const { status, message } = await createCreditCardExpense(
        newData,
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
        account: foundCard?.name as string,
        category: categoriesExpenses[0].name,
      })
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deleteCreditCardExpense(
      user as UserData,
      cardId as string,
      id as string,
    )
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  useEffect(() => {
    if (id && cardId) {
      const handleGetCreditCardDoc = async () => {
        const data = await getCreditCard(user as UserData, cardId)
        const expense = data?.expenses?.find((expense) => expense.id === id)

        const defaultValues = {
          name: expense?.name,
          value: expense?.value,
          account: expense?.account,
          category: expense?.category,
        }

        form.reset(defaultValues)
      }
      handleGetCreditCardDoc()
    }
  }, [id, cardId, form, user])

  useEffect(() => {
    if (!account) {
      form.setValue('account', foundCard?.name as string)
    }
  }, [foundCard, form, account])

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
          name="account"
          defaultValue={creditCardsData[0]?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cartão</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {creditCardsData.map(({ name, image }, index) => (
                    <SelectItem key={index} value={name}>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-[24px]">
                          <AvatarImage src={image} alt="@avatar" />
                          <AvatarFallback>
                            {name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
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
