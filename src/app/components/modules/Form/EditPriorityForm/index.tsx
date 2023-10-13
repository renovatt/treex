import Input from '@elements/Input'
import CustomButton from '@elements/CustomButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { PriorityFormProps, PrioritySchema } from '@/schemas'
import PriorityLevelSelect from '@elements/PriorityLevelSelect'

export default function EditPriorityForm() {
  const methods = useForm<PriorityFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(PrioritySchema),
  })

  const handleFormSubmit = async (data: PriorityFormProps) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Input name="name" label="Nome" placeholder="Monitor" type="text" />
        <PriorityLevelSelect />
        <CustomButton title="Salvar" type="submit" />
        <CustomButton title="Apagar" type="button" />
      </form>
    </FormProvider>
  )
}
