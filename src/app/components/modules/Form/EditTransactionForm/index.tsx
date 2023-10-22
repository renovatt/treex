import { auth } from '@/firebase'
import { useEffect } from 'react'
import Input from '@elements/Input'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { getTransactionDoc } from '@/lib/gets'
import SwitchInput from '@elements/SwitchInput'
import CustomButton from '@elements/CustomButton'
import CategorySelect from '@elements/CategorySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { TransactionFormProps, TransactionSchema } from '@/schemas'
import { deleteTransactionDoc, updatingUserTransaction } from '@/lib/db'
import { EditFormProps } from './types'

export default function EditTransactionForm({ id, closeModal }: EditFormProps) {
  const methods = useForm<TransactionFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TransactionSchema),
  })

  const [user] = useAuthState(auth)

  const handleDelete = async () => {
    const { status, message } = await deleteTransactionDoc(user as UserData, id)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  const handleFormSubmit = async (data: TransactionFormProps) => {
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
    closeModal()
  }

  useEffect(() => {
    const handleGetTransactionDoc = async () => {
      const data = await getTransactionDoc(user as UserData, id)
      const defaultValues = {
        name: data?.name,
        value: data?.value,
        category: data?.category,
        transaction: data?.transaction,
      }

      methods.reset(defaultValues)
    }
    handleGetTransactionDoc()
  }, [id, methods, user])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Input name="name" label="Nome" placeholder="Freelancer" type="text" />
        <Input
          name="value"
          label="Valor"
          placeholder="R$ 260,00"
          type="number"
        />
        <CategorySelect />
        <SwitchInput />
        <CustomButton title="Salvar" type="submit" />
        <CustomButton title="Apagar" type="button" onClick={handleDelete} />
      </form>
    </FormProvider>
  )
}
