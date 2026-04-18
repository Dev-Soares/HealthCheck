import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { signInSchema, type SignInData } from '../types/signIn'
import { signInService } from '../service/signInService'

export const useSignIn = () => {
  const navigate = useNavigate()

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: SignInData) => signInService(data),
    onSuccess: () => {
      toast.success('Bem-vindo de volta!')
      navigate('/')
    },
    onError: () => {
      toast.error('E-mail ou senha inválidos')
    },
  })

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data))

  return {
    ...form,
    onSubmit,
    isPending: mutation.isPending,
  }
}
