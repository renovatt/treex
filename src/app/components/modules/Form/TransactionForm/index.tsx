import Input from '@elements/Input'
import SwitchInput from '@elements/SwitchInput'
import CustomButton from '@elements/CustomButton'
import CategorySelect from '@elements/CategorySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { TransactionFormProps, TransactionSchema } from '@/schemas'

export default function TransactionForm() {
  const methods = useForm<TransactionFormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TransactionSchema),
  })

  const handleFormSubmit = async (data: TransactionFormProps) =>
    console.log(data)

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
