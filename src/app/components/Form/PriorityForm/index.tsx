import Input from '../Input'
import CustomButton from '../CustomButton'
import { PriorityFormProps, PrioritySchema } from '@/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectLevelPriority from '../SelectLevelPriority'

export default function PriorityForm() {
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
        <SelectLevelPriority />
        <CustomButton title="Salvar" type="submit" />
      </form>
    </FormProvider>
  )
}
