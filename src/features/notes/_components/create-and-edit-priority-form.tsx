import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/firebase/database/@types'
import { getPriority } from '@/firebase/database/priority/get-priority-doc'
import { createPriority } from '@/firebase/database/priority/create-priority-doc'
import { deletePriority } from '@/firebase/database/priority/delete-priority-doc'
import { updatePriority } from '@/firebase/database/priority/update-priority-doc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
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
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { DeleteModalAlert } from '@/components/@globals/delele-modal-alert'
import { PriorityFormProps, prioritySchema } from '../schemas/priority-schema'

const level = ['Importante', 'Menos importante', 'Muito importante'] as const

export default function CreateAndEditPriorityForm({ id }: { id?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PriorityFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(prioritySchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: PriorityFormProps) => {
    setIsLoading(true)
    try {
      if (id) {
        const newData = { ...data }
        newData.id = id

        const { status, message } = await updatePriority(
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

      const { status, message } = await createPriority(data, user as UserData)
      if (!status) {
        toast.error(message)
        return
      }
      toast.success(message)
      form.reset({
        name: '',
        level: level[0],
      })
    } catch (error) {
      toast.error('Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const { status, message } = await deletePriority(
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
      const handleGetPriorityDoc = async () => {
        const data = await getPriority(user as UserData, id)
        const defaultValues = {
          name: data?.name,
          level: data?.level,
        }

        form.reset(defaultValues)
      }
      handleGetPriorityDoc()
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
                <Input placeholder="Monitor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          defaultValue={level[0]}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
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
