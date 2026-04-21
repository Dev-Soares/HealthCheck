import { api } from '@/api/axios'
import type { Food } from '../types/food'

export const searchFoodService = async (query: string): Promise<Food[]> => {
  const { data } = await api.get('/food/search', { params: { search: query } })
  return data
}
