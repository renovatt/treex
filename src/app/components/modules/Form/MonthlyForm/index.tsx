import { auth } from '@/firebase'
import Input from '@elements/Input'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import CustomButton from '@elements/CustomButton'
import { savingUserMonthlyExpense } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MonthyPreviewFormProps, MonthyPreviewSchema } from '@/schemas'

export default function MonthlyForm() {
  const methods = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    const { status, message } = await savingUserMonthlyExpense(
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
        <Input name="name" label="Nome" placeholder="Faculdade" type="text" />
        <Input
          name="value"
          label="Valor"
          placeholder="R$ 120,00"
          type="number"
        />
        <CustomButton title="Salvar" type="submit" />
      </form>
    </FormProvider>
  )
}
