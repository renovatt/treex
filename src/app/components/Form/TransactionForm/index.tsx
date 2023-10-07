import Input from '../Input'
import SwitchInput from '../SwitchInput'
import CustomButton from '../CustomButton'
import SelectCategory from '../SelectCategory'
import { useForm, FormProvider } from 'react-hook-form'
import { TransactionFormProps, TransactionSchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
        <SelectCategory />
        <SwitchInput />
        <CustomButton title="Salvar" type="submit" />
      </form>
    </FormProvider>
  )
}
