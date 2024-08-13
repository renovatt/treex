import { Metadata } from 'next'
import FooterForm from '@/components/features/auth/footer-form'
import HeaderForm from '@/components/features/auth/header-form'
import RecoveryForm from '@/components/features/auth/recovery-form'
import AuthContainer from '@/components/features/layout/auth-container'

export const metadata: Metadata = {
  title: 'TreeX | Recuperação',
  description: 'Generated by create next app',
}

export default function Recovery() {
  return (
    <AuthContainer>
      <HeaderForm
        title="Recupere sua senha"
        description="Mantenha sua conta segura"
      />
      <RecoveryForm />
      <FooterForm
        href="/login"
        linkTitle=" Fazer login"
        label="  Já tem uma conta?"
      />
    </AuthContainer>
  )
}
