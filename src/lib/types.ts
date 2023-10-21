import { User } from 'firebase/auth'

export type UserData = Partial<User>

export interface ErrorMessageResponse extends Error {
  message: string
  status: boolean
}
