import { Metadata } from 'next'
import RegisterForm from '@/features/auth/register-form'
import FooterForm from '@/features/auth/footer-form'
import HeaderForm from '@/features/auth/header-form'
import AuthContainer from '@/features/layout/_components/auth-container'
import GoogleButton from '@/features/auth/google-button'

export const metadata: Metadata = {
  title: 'TreeX | Cadastro',
  description: 'Generated by create next app',
}

export default function Register() {
  return (
    <AuthContainer>
      <HeaderForm
        title="Não perca mais tempo"
        description="Crie agora sua conta e tenha mais controle"
      />
      <GoogleButton />
      <RegisterForm />
      <FooterForm
        href="/login"
        linkTitle=" Fazer login"
        label="  Já tem uma conta?"
      />
    </AuthContainer>
  )
}
