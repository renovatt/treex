import { auth } from '@/firebase'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { getPriorityDoc } from '@/lib/gets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PriorityFormProps, PrioritySchema } from '@/schemas'
import { deletePriorityDoc, updatingUserPriorityList } from '@/lib/db'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type EditFormProps = {
  id: string
}

const level = ['Importante', 'Menos importante', 'Muito importante'] as const

export default function EditPriorityForm({ id }: EditFormProps) {
  const form = useForm<PriorityFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(PrioritySchema),
  })

  const [user] = useAuthState(auth)

  const handleDelete = async () => {
    const { status, message } = await deletePriorityDoc(user as UserData, id)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  const handleFormSubmit = async (data: PriorityFormProps) => {
    const newData = { ...data }
    newData.id = id

    const { status, message } = await updatingUserPriorityList(
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
    const handleGetPriorityDoc = async () => {
      const data = await getPriorityDoc(user as UserData, id)
      const defaultValues = {
        name: data?.name,
        level: data?.level,
      }

      form.reset(defaultValues)
    }
    handleGetPriorityDoc()
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
                <Input placeholder="Monitor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolhar nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {level.map((category, index) => (
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

        <div className="space-y-2">
          <Button type="submit" className="w-full">
            Salvar
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </div>
      </form>
    </Form>
  )
}
