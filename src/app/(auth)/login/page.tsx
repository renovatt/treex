import { Metadata } from 'next'
import FooterForm from '@/components/features/auth/footer-form'
import HeaderForm from '@/components/features/auth/header-form'
import LoginForm from '@/components/features/auth/login-form'
import AuthContainer from '@/components/features/layout/auth-container'
import GoogleButton from '@/components/features/auth/google-button'

export const metadata: Metadata = {
  title: 'TreeX | Login',
  description: 'Generated by create next app',
}

export default function Login() {
  return (
    <AuthContainer>
      <HeaderForm
        title="Começe agora"
        description="Tenha mais controle sobre seu dinheiro"
      />
      <GoogleButton />
      <LoginForm />
      <FooterForm
        href="/register"
        linkTitle="Cadastrar"
        label="Ainda não tem uma conta?"
      />
    </AuthContainer>
  )
}
