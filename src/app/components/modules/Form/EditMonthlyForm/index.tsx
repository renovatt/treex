import { auth } from '@/firebase'
import Input from '@elements/Input'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { EditFormProps } from './types'
import { getMonthlyDoc } from '@/lib/gets'
import CustomButton from '@elements/CustomButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MonthyPreviewFormProps, MonthyPreviewSchema } from '@/schemas'
import { deleteMonthlyDoc, updatingUserMonthlyExpense } from '@/lib/db'

export default function EditMonthlyForm({ id, closeModal }: EditFormProps) {
  const methods = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const [user] = useAuthState(auth)

  const handleDelete = async () => {
    const { status, message } = await deleteMonthlyDoc(user as UserData, id)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  const handleFormSubmit = async (data: MonthyPreviewFormProps) => {
    const newData = { ...data }
    newData.id = id

    const { status, message } = await updatingUserMonthlyExpense(
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
    const handleGetMonthlyDoc = async () => {
      const data = await getMonthlyDoc(user as UserData, id)
      const defaultValues = {
        name: data?.name,
        value: data?.value,
      }

      methods.reset(defaultValues)
    }
    handleGetMonthlyDoc()
  }, [id, methods, user])

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
        <CustomButton title="Apagar" type="button" onClick={handleDelete} />
      </form>
    </FormProvider>
  )
}
