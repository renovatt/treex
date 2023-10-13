import { ComponentProps } from 'react'

export type AuthButtonProps = ComponentProps<'button'> & {
  type: 'submit' | 'reset' | 'button'
  title: string
}
