import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

export type SignUpData = z.infer<typeof signUpSchema>
