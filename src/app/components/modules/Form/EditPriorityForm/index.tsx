import { auth } from '@/firebase'
import { useEffect } from 'react'
import Input from '@elements/Input'
import toast from 'react-hot-toast'
import { UserData } from '@/lib/types'
import { getPriorityDoc } from '@/lib/gets'
import CustomButton from '@elements/CustomButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PriorityFormProps, PrioritySchema } from '@/schemas'
import PriorityLevelSelect from '@elements/PriorityLevelSelect'
import { deletePriorityDoc, updatingUserPriorityList } from '@/lib/db'
import { EditFormProps } from './types'

export default function EditPriorityForm({ id, closeModal }: EditFormProps) {
  const methods = useForm<PriorityFormProps>({
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
    closeModal()
  }

  useEffect(() => {
    const handleGetPriorityDoc = async () => {
      const data = await getPriorityDoc(user as UserData, id)
      const defaultValues = {
        name: data?.name,
        level: data?.level,
      }

      methods.reset(defaultValues)
    }
    handleGetPriorityDoc()
  }, [id, methods, user])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Input name="name" label="Nome" placeholder="Monitor" type="text" />
        <PriorityLevelSelect />
        <CustomButton title="Salvar" type="submit" />
        <CustomButton title="Apagar" type="button" onClick={handleDelete} />
      </form>
    </FormProvider>
  )
}
