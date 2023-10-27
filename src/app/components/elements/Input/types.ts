import { ComponentProps } from 'react'

export type InputProps = ComponentProps<'input'> & {
  label: string
  placeholder: string
  type: string
  name: string
  noDark?: boolean
}
