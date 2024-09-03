import {
  LoginFormProps,
  RegisterFormProps,
  RecoverySchemaProps,
} from '@/schemas/auth'
import {
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth, googleProvider } from '@/firebase'
import { setCookie, destroyCookie } from 'nookies'
import { savingUserDataIntoFirestore } from './db'
import { ErrorMessageResponse, UserData } from './@types'

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    let accessToken = ''

    if (user && 'accessToken' in user) {
      accessToken = user.accessToken as string
      setCookie(null, '@auth_accessToken', accessToken, {
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      })
    } else {
      console.log('accessToken não está presente no objeto user.')
    }

    const newUser: UserData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      providerId: user.providerId,
    }

    await savingUserDataIntoFirestore(newUser)

    return { message: `Seja bem vindo, ${newUser.displayName}`, status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const createCredential = async (data: RegisterFormProps) => {
  try {
    const { name, email, password } = data
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )

    const user = userCredential.user

    const newUser: UserData = {
      uid: user.uid,
      displayName: name,
      email: user.email,
      providerId: user.providerId,
    }

    await savingUserDataIntoFirestore(newUser)

    return { message: 'Usuário criado com sucesso', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const signInWithCredential = async (data: LoginFormProps) => {
  try {
    const { email, password } = data
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    let accessToken = ''

    if (user && 'accessToken' in user) {
      accessToken = user.accessToken as string
      setCookie(null, '@auth_accessToken', accessToken)
    } else {
      console.log('accessToken não está presente no objeto user.')
    }

    return { message: 'Seja bem vindo', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}

export const logout = () => {
  signOut(auth)
  destroyCookie(null, '@auth_accessToken')
}

export const passwordReset = async (data: RecoverySchemaProps) => {
  try {
    const { email } = data
    await sendPasswordResetEmail(auth, email)
    return { message: 'Verifique o seu e-mail!', status: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage: ErrorMessageResponse = {
        message: error.message || 'Erro interno',
        status: false,
        name: '',
      }
      return errorMessage as ErrorMessageResponse
    }
    return { message: 'Ocorreu um erro desconhecido', status: false }
  }
}
