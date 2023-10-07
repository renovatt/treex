import { ComponentProps } from 'react'

export type CustomButtonProps = ComponentProps<'button'> & {
  type: 'submit' | 'reset' | 'button'
  title: string
}
