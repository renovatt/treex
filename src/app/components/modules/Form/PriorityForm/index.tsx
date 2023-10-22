import { auth } from '@/firebase'
import Input from '@elements/Input'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import CustomButton from '@elements/CustomButton'
import { savingUserPriorityList } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PriorityFormProps, PrioritySchema } from '@/schemas'
import PriorityLevelSelect from '@elements/PriorityLevelSelect'

export default function PriorityForm() {
  const methods = useForm<PriorityFormProps>({
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
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Input name="name" label="Nome" placeholder="Monitor" type="text" />
        <PriorityLevelSelect />
        <CustomButton title="Salvar" type="submit" />
      </form>
    </FormProvider>
  )
}
