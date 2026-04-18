import { api } from '@/api/axios'
import type { SignUpData } from '../types/signUp'

export const signUpService = async (data: SignUpData): Promise<{ message: string }> => {
  const { data: response } = await api.post('/auth/register', data)
  return response
}
