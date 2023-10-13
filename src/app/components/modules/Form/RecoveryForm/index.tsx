'use client'
import Input from '@elements/Input'
import CustomButton from '@elements/CustomButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { RecoverySchema, RecoverySchemaProps } from '@/schemas/auth'

export default function RecoveryForm() {
  const methods = useForm<RecoverySchemaProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RecoverySchema),
  })

  const handleFormSubmit = async (data: RecoverySchemaProps) =>
    console.log(data)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <Input
          name="email"
          label="Email"
          placeholder="Informe o seu email"
          type="text"
        />

        <CustomButton title="Enviar" type="submit" />
      </form>
    </FormProvider>
  )
}
