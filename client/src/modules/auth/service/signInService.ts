import { api } from '@/api/axios'
import type { SignInData } from '../types/signIn'

export const signInService = async (data: SignInData): Promise<{ message: string }> => {
  const { data: response } = await api.post('/auth/login', data)
  return response
}
