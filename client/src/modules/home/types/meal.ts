export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'supper'

export interface Meal {
  id: string
  name: string
  mealType: MealType
  foods: string[]
  time: string
  kcal: number
}
