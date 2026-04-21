import { z } from 'zod'

export const foodSchema = z.object({
  id: z.string(),
  name: z.string(),
  kcal: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  category: z.enum(['Proteínas', 'Vegetais', 'Grãos', 'Peixes', 'Naturais']),
})

export type Food = z.infer<typeof foodSchema>

export const FOOD_CATEGORIES = ['Todos', 'Proteínas', 'Vegetais', 'Grãos', 'Peixes', 'Naturais'] as const
export type FoodCategory = typeof FOOD_CATEGORIES[number]

export interface GetFoodsParams {
  category?: FoodCategory
  search?: string
}
