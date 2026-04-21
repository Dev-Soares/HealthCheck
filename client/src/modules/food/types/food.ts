import { z } from 'zod'

export const foodSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
})

export type Food = z.infer<typeof foodSchema>
