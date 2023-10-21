'use client'
import Input from '@elements/Input'
import { passwordReset } from '@/lib/auth'
import AuthButton from '@elements/AuthButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { RecoverySchema, RecoverySchemaProps } from '@/schemas/auth'
import toast from 'react-hot-toast'

export default function RecoveryForm() {
  const methods = useForm<RecoverySchemaProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RecoverySchema),
  })

  const handleFormSubmit = async (data: RecoverySchemaProps) => {
    const { status, message } = await passwordReset(data)
    if (!status) {
      toast.error(message)
      return
    }
    toast.success(message)
    methods.reset()
  }

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
        <AuthButton title="Enviar" type="submit" />
      </form>
    </FormProvider>
  )
}
