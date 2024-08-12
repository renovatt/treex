import { auth } from '@/firebase'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { savingUserPriorityList } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PriorityFormProps, PrioritySchema } from '@/schemas'
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

const level = ['Importante', 'Menos importante', 'Muito importante'] as const

export default function PriorityForm() {
  const form = useForm<PriorityFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(PrioritySchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: PriorityFormProps) => {
    const { status, message } = await savingUserPriorityList(
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
