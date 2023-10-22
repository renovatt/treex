import { auth } from '@/firebase'
import Input from '@elements/Input'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import SwitchInput from '@elements/SwitchInput'
import { savingUserTransaction } from '@/lib/db'
import CustomButton from '@elements/CustomButton'
import CategorySelect from '@elements/CategorySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { TransactionFormProps, TransactionSchema } from '@/schemas'

export default function TransactionForm() {
  const methods = useForm<TransactionFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TransactionSchema),
  })

  const [user] = useAuthState(auth)

  const handleFormSubmit = async (data: TransactionFormProps) => {
    const { status, message } = await savingUserTransaction(
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
        <Input name="name" label="Nome" placeholder="Freelancer" type="text" />
        <Input
          name="value"
          label="Valor"
          type="number"
          placeholder="R$ 260,00"
        />
        <CategorySelect />
        <SwitchInput />
        <CustomButton title="Salvar" type="submit" />
      </form>
    </FormProvider>
  )
}
