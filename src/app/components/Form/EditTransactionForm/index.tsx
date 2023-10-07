import Input from '../Input'
import SwitchInput from '../SwitchInput'
import { FormProvider, useForm } from 'react-hook-form'
import CustomButton from '../CustomButton'
import SelectCategory from '../SelectCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionFormProps, TransactionSchema } from '@/zod'

export default function EditTransactionForm() {
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
          placeholder="R$ 260,00"
          type="number"
        />
        <SelectCategory />
        <SwitchInput />
        <CustomButton title="Salvar" type="submit" />
        <CustomButton title="Apagar" type="button" />
      </form>
    </FormProvider>
  )
}
