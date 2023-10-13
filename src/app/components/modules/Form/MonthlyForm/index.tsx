import Input from '@elements/Input'
import CustomButton from '@elements/CustomButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { MonthyPreviewFormProps, MonthyPreviewSchema } from '@/schemas'

export default function MonthlyForm() {
  const methods = useForm<MonthyPreviewFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(MonthyPreviewSchema),
  })

  const handleFormSubmit = async (data: MonthyPreviewFormProps) =>
    console.log(data)

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
